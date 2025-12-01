import { Button, ButtonProps } from '@mantine/core';
import classes from './ButtonBase.module.scss';

type MantineButtonProps = ButtonProps;

const ButtonBase = (props: MantineButtonProps) => {
  return (
    <Button
      {...props}
      classNames={{
        // 🔑 Mantine Selector Key: map your custom class here
        root: classes.ButtonBase,
      }}
      className={props.className}
    />
  );
};

export default ButtonBase;
