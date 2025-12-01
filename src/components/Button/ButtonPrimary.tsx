import { ButtonProps } from '@mantine/core';
import ButtonBase from './ButtonBase';
import classes from './ButtonPrimary.module.scss';

type MantineButtonProps = ButtonProps;

const ButtonPrimary = (props: MantineButtonProps) => {
  return <ButtonBase {...props} className={classes.ButtonPrimary} />;
};

export default ButtonPrimary;
