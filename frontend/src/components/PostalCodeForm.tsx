import { FormEvent, useState } from 'react';
import { Button } from './ui/Button';

interface PostalCodeFormProps {
  onSubmit: (postalCode: string) => void;
}

export function PostalCodeForm({ onSubmit }: PostalCodeFormProps) {
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(postalCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
}