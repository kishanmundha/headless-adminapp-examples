'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

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
      <h1 className={styles.title}>Messages</h1>
      <p className={styles.description}>
        Custom page or integration with other services can be added here.
      </p>
    </div>
  );
}
