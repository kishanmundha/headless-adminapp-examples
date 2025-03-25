import { faker } from '@faker-js/faker';
import { schemaStore } from '@/app/talent-desk/config/server/schemaStore';
import { Job, jobSchema } from '@/app/talent-desk/config/schema/job';
import { Candidate } from '@/app/talent-desk/config/schema/candidate';
import { Interview } from '@/app/talent-desk/config/schema/interview';
import {
  Application,
  applicationSchema,
} from '@/app/talent-desk/config/schema/application';
import { EntityName } from '../../enums';
import type { CurrentUser } from '../../../../mockuser';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { User } from '../../schema/user';
import { Offer } from '../../schema/offer';

dayjs.extend(utc);
dayjs.extend(timezone);

type DbJob = Job;
type DbCandidate = Omit<Candidate, 'avatar'> & {
  avatar: string;
};
type DbApplication = Omit<Application, 'candidate_id' | 'job_id'> & {
  candidate_id: string;
  job_id: string;
};

type DbInterview = Omit<
  Interview,
  'candidate_id' | 'job_id' | 'application_id'
> & {
  candidate_id: string;
  job_id: string;
  application_id: string;
};

type DbUser = Omit<User, 'avatar'> & { avatar: string };
type DbOffer = Omit<Offer, 'candidate_id' | 'job_id' | 'application_id'> & {
  candidate_id: string;
  job_id: string;
  application_id: string;
};

let generated = false;
let generatingPromise: Promise<void> | null = null;

async function prepareMockDataInternal(currentUser: CurrentUser) {
  const users: DbUser[] = new Array(2).fill(null).map((index) => {
    if (index === 0) {
      return {
        ...currentUser,
      };
    }

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: faker.string.uuid(),
      fullName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: faker.internet.email({
        firstName,
        lastName,
        provider: 'support.com',
      }),
      avatar: faker.image.urlPicsumPhotos({
        width: 50,
        height: 50,
      }),
    };
  });

  const jobTitles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'QA Engineer',
    'DevOps Engineer',
    'Technical Writer',
    'Sales Manager',
    'Customer Success Manager',
    'HR Manager',
    'Recruiter',
    'Marketing Manager',
    'Accountant',
    'Office Manager',
    'Operations Manager',
    'Project Manager',
    'Business Analyst',
    'Financial Analyst',
    'Legal Counsel',
    'Graphic Designer',
    'UI Designer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Mobile Developer',
  ];

  const jobs: DbJob[] = jobTitles.map((title) => {
    let salaryMin = Number(faker.finance.amount({ min: 50000, max: 100000 }));
    let salaryMax = Number(faker.finance.amount({ min: 100000, max: 200000 }));

    salaryMin = Math.round(salaryMin / 10000) * 10000;
    salaryMax = Math.round(salaryMax / 10000) * 10000;

    return {
      id: faker.string.uuid(),
      title: title,
      department: faker.company.buzzNoun(),
      location: faker.helpers.arrayElement(
        jobSchema.attributes.location.options.map((o) => o.value)
      ),
      salaryMin,
      salaryMax,
      description: faker.lorem.paragraphs(3),
      type: faker.helpers.arrayElement(
        jobSchema.attributes.type.options.map((o) => o.value)
      ),
      status: faker.helpers.arrayElement(
        jobSchema.attributes.status.options.map((o) => o.value)
      ),
    };
  });

  const candidates: DbCandidate[] = new Array(1000).fill(null).map(() => ({
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.urlPicsumPhotos({
      width: 50,
      height: 50,
    }),
    experience: faker.number.int({ min: 0, max: 240 }),
  }));

  function getAppliedAt() {
    let count = 0;

    let applied_at = dayjs(
      faker.date.recent({
        days: 180,
      })
    ).tz('UTC');

    while (count < 5) {
      if (
        !(
          applied_at.hour() < 9 ||
          applied_at.hour() > 17 ||
          applied_at.day() === 0 ||
          applied_at.day() === 6
        )
      ) {
        break;
      }

      applied_at = dayjs(
        faker.date.recent({
          days: 180,
        })
      ).tz('UTC');

      count++;
    }

    return applied_at.toDate();
  }

  const applications: DbApplication[] = new Array(1000).fill(null).map(() => {
    const candidate = faker.helpers.arrayElement(candidates);
    const job = faker.helpers.arrayElement(jobs);

    let status = faker.helpers.arrayElement(
      applicationSchema.attributes.status.options.map((o) => o.value)
    );

    let archived = false;

    const applied_at = getAppliedAt();

    if (dayjs().diff(applied_at, 'days') > 90) {
      if (
        !['rejected', 'interview-rejected', 'offer-rejected'].includes(status)
      ) {
        status = 'rejected';
      }
    }

    if (dayjs().diff(applied_at, 'days') > 30) {
      if (
        ['rejected', 'interview-rejected', 'offer-rejected'].includes(status)
      ) {
        archived = true;
      }
    }

    return {
      id: faker.string.uuid(),
      candidate_id: candidate.id,
      job_id: job.id,
      title: `${candidate.fullName}`,
      status: status,
      applied_at: applied_at.toISOString(),
      archived,
    };
  });

  const interviews: DbInterview[] = applications
    .filter((a) => a.status === 'interview-scheduled')
    .map((item) => {
      const candidate = candidates.find((c) => c.id === item.candidate_id);
      const job = jobs.find((j) => j.id === item.job_id);

      const _start = faker.date.future({
        refDate: new Date(item.applied_at!),
      });

      // round to the nearest 30 minutes
      _start.setMinutes(Math.round(_start.getMinutes() / 30) * 30);
      _start.setSeconds(0);
      _start.setMilliseconds(0);

      const start = _start.toISOString();
      const end = new Date(_start.getTime() + 30 * 60 * 1000).toISOString();

      return {
        id: faker.string.uuid(),
        application_id: item.id,
        candidate_id: item.candidate_id,
        job_id: item.job_id,
        title: `${candidate?.fullName} - ${job?.title}`,
        start,
        end,
        description: faker.lorem.paragraphs(3),
      };
    });

  const offers: DbOffer[] = applications
    .filter(
      (a) =>
        a.status &&
        ['offered', 'offer-accepted', 'offer-rejected', 'hired'].includes(
          a.status
        )
    )
    .map((item) => {
      const candidate = candidates.find((c) => c.id === item.candidate_id);
      const job = jobs.find((j) => j.id === item.job_id);

      let status: string | null = null;

      if (item.status === 'offered') {
        status = 'pending';
      } else if (item.status === 'offer-accepted' || item.status === 'hired') {
        status = 'accepted';
      } else if (item.status === 'offer-rejected') {
        status = 'rejected';
      }

      const offered_at = faker.date.recent();

      return {
        id: faker.string.uuid(),
        application_id: item.id,
        candidate_id: item.candidate_id,
        job_id: item.job_id,
        title: `${candidate?.fullName} - ${job?.title}`,
        offered_at: offered_at.toISOString(),
        status: status,
        joining_date: faker.date
          .future({
            refDate: offered_at,
          })
          .toISOString(),
        salary: job?.salaryMin,
      };
    });

  await schemaStore.getModel(EntityName.User).bulkCreate(users);
  await schemaStore.getModel(EntityName.Job).bulkCreate(jobs);
  await schemaStore.getModel(EntityName.Candidate).bulkCreate(candidates);
  await schemaStore.getModel(EntityName.Application).bulkCreate(applications);
  await schemaStore.getModel(EntityName.Interview).bulkCreate(interviews);
  await schemaStore.getModel(EntityName.Offer).bulkCreate(offers);
}

async function prepareMockData(currentUser: CurrentUser) {
  if (generated) {
    return;
  }

  if (generatingPromise) {
    await generatingPromise;
    return;
  }

  generatingPromise = prepareMockDataInternal(currentUser);
  await generatingPromise;
  generated = true;
  generatingPromise = null;
}

export async function resetMockData(currentUser: CurrentUser) {
  generated = false;
  generatingPromise = null;

  await prepareMockData(currentUser);
}
