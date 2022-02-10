import React, { ReactElement } from "react";
import styled from "styled-components";
import Icon, { IconSize } from "./Icon";
import { Colors } from "../../constants/Colors";
import { CloseButton } from "../designSystems/appsmith/CloseButton";
import { createMessage, LEARN_MORE } from "../../constants/messages";

export enum NotificationVariant {
  error,
  warning,
  enterprise,
  info,
}

type NotificationBannerProps = {
  hasIcon?: boolean;
  icon?: string;
  variant: NotificationVariant;
  canClose?: boolean;
  onClose?: any;
  children?: ReactElement | ReactElement[];
  style?: React.CSSProperties;
  learnMoreClickHandler?: any;
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 8px;
  position: relative;
  max-width: 486px;
  width: 100%;
  height: 56px;

  &.error {
    background-color: red;
  }

  &.enterprise {
    background-color: #e8f5fa;
  }
`;

const LintText = styled.a`
  :hover {
    color: ${Colors.CRUSTA};
  }

  color: ${Colors.CRUSTA};
  cursor: pointer;
  font-weight: 500;
  margin-left: 0;
`;

type NotificationIconProps = {
  variant: NotificationVariant;
};

function NotificationIcon(props: NotificationIconProps) {
  const { variant } = props;
  let icon = null;
  switch (variant) {
    case NotificationVariant.error:
      icon = <Icon fillColor={Colors.RED} name="danger" size={IconSize.XXL} />;
      break;
    case NotificationVariant.warning:
      icon = (
        <Icon
          fillColor={Colors.BURNING_ORANGE}
          name="warning"
          size={IconSize.XXL}
        />
      );
      break;
    case NotificationVariant.enterprise:
      icon = (
        <Icon
          fillColor={Colors.BLUE_BAYOUX}
          name="enterprise"
          size={IconSize.XXL}
        />
      );
      break;
    case NotificationVariant.info:
      icon = <Icon fillColor={Colors.BLACK} name="info" size={IconSize.XXL} />;
      break;
  }
  return icon;
}

const TextContainer = styled.div`
  flex-grow: 1;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-items: center;

  & button {
    position: unset;
    top: unset;
    right: 3px;
  }
`;
const IconContainer = styled.div``;
const LearnMoreContainer = styled.div``;

export function NotificationBanner(props: NotificationBannerProps) {
  return (
    <FlexContainer className={"enterprise"} style={props.style}>
      <IconContainer>
        {props.hasIcon && <NotificationIcon variant={props.variant} />}
      </IconContainer>
      <TextContainer>
        {props.children}
        <LearnMoreContainer>
          <LintText onClick={props.learnMoreClickHandler}>
            {createMessage(LEARN_MORE)}
          </LintText>
        </LearnMoreContainer>
      </TextContainer>
      <CloseButtonContainer>
        {props.canClose && (
          <CloseButton color={Colors.BLACK} onClick={props.onClose} size={12} />
        )}
      </CloseButtonContainer>
    </FlexContainer>
  );
}