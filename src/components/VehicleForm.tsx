import { FormEvent, useState } from 'react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import type { AddVehicleRequest } from '../../lib/api-types';

interface VehicleFormProps {
  onSubmit: (vehicle: AddVehicleRequest) => void;
  manufacturers: Array<{ id: string; name: string }>;
  models: Array<{ id: string; name: string }>;
  onManufacturerChange: (manufacturerId: string) => void;
}

export function VehicleForm({ onSubmit, manufacturers, models, onManufacturerChange }: VehicleFormProps) {
  const [formData, setFormData] = useState<Partial<AddVehicleRequest>>({
    year: new Date().getFullYear(),
    condition: 'used',
    ownershipType: 'owned',
    garageParked: false,
    usageType: 'personal',
    wantsComprehensive: false,
    wantsCollision: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData as AddVehicleRequest);
    }
  };

  const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const manufacturerId = e.target.value;
    setFormData({ 
      ...formData, 
      manufacturerId,
      modelId: undefined // Reset model when manufacturer changes
    });
    onManufacturerChange(manufacturerId);
  };

  const isFormValid = (): boolean => {
    return !!(
      formData.year &&
      formData.manufacturerId &&
      formData.modelId &&
      formData.condition &&
      formData.ownershipType &&
      formData.purchaseDate &&
      formData.usageType &&
      formData.commuteDistance &&
      formData.annualKilometers &&
      (formData.usageType === 'personal' || formData.businessKilometers)
    );
  };

  const years = Array.from(
    { length: 26 },
    (_, i) => 2000 + i
  );

  const commuteDistances = Array.from(
    { length: 40 },
    (_, i) => (i + 1) * 5
  );

  const businessKilometers = Array.from(
    { length: 80 },
    (_, i) => (i + 1) * 5
  );

  const annualKilometers = Array.from(
    { length: 100 },
    (_, i) => (i + 1) * 1000
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
          required
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>

        <Select
          label="Manufacturer"
          value={formData.manufacturerId}
          onChange={handleManufacturerChange}
          required
        >
          <option value="">Select manufacturer</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </Select>

        <Select
          label="Model"
          value={formData.modelId}
          onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
          disabled={!formData.manufacturerId}
          required
        >
          <option value="">Select model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </Select>

        <Select
          label="Condition when bought"
          value={formData.condition}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'new' | 'used' })}
          required
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </Select>

        <Select
          label="Ownership type"
          value={formData.ownershipType}
          onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value as 'owned' | 'leased' })}
          required
        >
          <option value="owned">Owned</option>
          <option value="leased">Leased</option>
        </Select>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purchase date
          </label>
          <input
            type="month"
            min="2019-01"
            max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
            value={formData.purchaseDate}
            onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Garage parked overnight?
          </label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="yes"
                checked={formData.garageParked === true}
                onChange={() => setFormData({ ...formData, garageParked: true })}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="no"
                checked={formData.garageParked === false}
                onChange={() => setFormData({ ...formData, garageParked: false })}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <Select
          label="Primary usage"
          value={formData.usageType}
          onChange={(e) => setFormData({ ...formData, usageType: e.target.value as 'business' | 'personal' })}
          required
        >
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </Select>

        <Select
          label="One-way commute distance (km)"
          value={formData.commuteDistance}
          onChange={(e) => setFormData({ ...formData, commuteDistance: Number(e.target.value) })}
          required
        >
          <option value="">Select distance</option>
          {commuteDistances.map((distance) => (
            <option key={distance} value={distance}>{distance} km</option>
          ))}
        </Select>

        {formData.usageType === 'business' && (
          <Select
            label="Daily business kilometers"
            value={formData.businessKilometers}
            onChange={(e) => setFormData({ ...formData, businessKilometers: Number(e.target.value) })}
            required
          >
            <option value="">Select distance</option>
            {businessKilometers.map((distance) => (
              <option key={distance} value={distance}>{distance} km</option>
            ))}
          </Select>
        )}

        <Select
          label="Annual kilometers"
          value={formData.annualKilometers}
          onChange={(e) => setFormData({ ...formData, annualKilometers: Number(e.target.value) })}
          required
        >
          <option value="">Select distance</option>
          {annualKilometers.map((distance) => (
            <option key={distance} value={distance}>{distance.toLocaleString()} km</option>
          ))}
        </Select>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Coverage
          </label>
          <div className="mt-2 space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.wantsComprehensive}
                onChange={(e) => setFormData({ ...formData, wantsComprehensive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Comprehensive Coverage</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.wantsCollision}
                onChange={(e) => setFormData({ ...formData, wantsCollision: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Collision Coverage</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={!isFormValid()}>
          Add Vehicle
        </Button>
      </div>
    </form>
  );
}