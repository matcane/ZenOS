import { AuthForm } from "@/components/core";
import { useAuthStore } from "@/store/core";

export default function Page() {
  const signIn = useAuthStore((state) => state.signIn);
  return (
    <AuthForm
      title="Sign In"
      buttonText="Login"
      linkText={["Don't have an account?", "Register"]}
      linkHref="sign-up"
      onSubmit={signIn}
    />
  );
}
