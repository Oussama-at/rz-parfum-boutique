import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showCriteria?: boolean;
  required?: boolean;
  className?: string;
}

const checkPasswordCriteria = (password: string): PasswordCriteria => ({
  minLength: password.length >= 6,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

const CriteriaItem = ({ met, label }: { met: boolean; label: string }) => (
  <div className={cn(
    "flex items-center gap-2 text-sm transition-colors",
    met ? "text-green-600" : "text-muted-foreground"
  )}>
    {met ? (
      <Check className="w-3.5 h-3.5" />
    ) : (
      <X className="w-3.5 h-3.5" />
    )}
    <span>{label}</span>
  </div>
);

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder = "••••••••",
  showCriteria = false,
  required = false,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const criteria = checkPasswordCriteria(value);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("pl-10 pr-10", className)}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {showCriteria && value.length > 0 && (
        <div className="grid grid-cols-2 gap-1 p-3 bg-muted/50 rounded-md">
          <CriteriaItem met={criteria.minLength} label="6 caractères min." />
          <CriteriaItem met={criteria.hasUppercase} label="1 majuscule" />
          <CriteriaItem met={criteria.hasLowercase} label="1 minuscule" />
          <CriteriaItem met={criteria.hasNumber} label="1 chiffre" />
          <CriteriaItem met={criteria.hasSpecial} label="1 caractère spécial" />
        </div>
      )}
    </div>
  );
}
