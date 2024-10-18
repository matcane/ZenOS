import { AuthForm } from "@/components/core";
import { useAuthStore } from "@/store/core";

export default function SignUp() {
  const signUp = useAuthStore((state) => state.signUp);

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      linkText={["Already have an account?", "Log In"]}
      linkHref="sign-in"
      onSubmit={signUp}
    />
  );
}
