'use client';

import { LIB_REF_HIDDEN } from '@/app/env';
import { Button, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: tokens.spacingVerticalL,
  },
  title: {
    fontSize: tokens.fontSizeBase600,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
  },
});

export default function WelcomePage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Support</h1>
      {!LIB_REF_HIDDEN && (
        <p className={styles.description}>
          Need help? Here are some resources to get you started.
        </p>
      )}

      {!LIB_REF_HIDDEN && (
        <div
          style={{
            marginTop: tokens.spacingVerticalXXL,
            display: 'flex',
            gap: tokens.spacingHorizontalL,
          }}
        >
          <Button
            onClick={() =>
              window.open('https://headless-adminapp.github.io/', '_blank')
            }
          >
            Documentation
          </Button>
          <Button
            onClick={() =>
              window.open(
                'https://www.linkedin.com/in/kishan-mundha/',
                '_blank'
              )
            }
          >
            Contact
          </Button>
          <Button
            onClick={() =>
              window.open(
                'https://github.com/headless-adminapp/adminapp',
                '_blank'
              )
            }
          >
            Github
          </Button>
        </div>
      )}
    </div>
  );
}
