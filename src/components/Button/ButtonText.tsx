// src/components/ButtonText.tsx

import { ButtonProps } from '@mantine/core';
import ButtonBase from './ButtonBase';
import classes from './ButtonText.module.scss';

type MantineButtonProps = ButtonProps;

const ButtonText = (props: MantineButtonProps) => {
  return <ButtonBase {...props} className={classes.textLink} />;
};

export default ButtonText;
