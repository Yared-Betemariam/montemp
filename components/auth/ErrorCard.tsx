import CardWrapper from "./CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to Sign in"
    ></CardWrapper>
  );
};
export default ErrorCard;
