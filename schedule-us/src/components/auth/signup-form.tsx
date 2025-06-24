import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;