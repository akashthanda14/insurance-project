import { Car } from 'lucide-react';
import type { VehicleResponse } from '../../lib/api-types';
import { Button } from './ui/Button';

interface VehicleListProps {
  vehicles: VehicleResponse[];
  onAddMore: () => void;
  onSubmitQuote: () => void;
}

export function VehicleList({ vehicles, onAddMore, onSubmitQuote }: VehicleListProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {vehicle.year} {vehicle.manufacturer.name} {vehicle.model.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {vehicle.condition} · {vehicle.ownershipType} · {vehicle.usageType} use
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Commute:</span> {vehicle.commuteDistance} km
              </div>
              <div>
                <span className="font-medium">Annual:</span> {vehicle.annualKilometers.toLocaleString()} km
              </div>
              {vehicle.usageType === 'business' && (
                <div>
                  <span className="font-medium">Business:</span> {vehicle.businessKilometers} km/day
                </div>
              )}
              <div>
                <span className="font-medium">Coverage:</span>{' '}
                {[
                  vehicle.wantsComprehensive && 'Comprehensive',
                  vehicle.wantsCollision && 'Collision'
                ].filter(Boolean).join(', ') || 'Basic'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onAddMore}>
          Add Another Vehicle
        </Button>
        <Button onClick={onSubmitQuote} disabled={vehicles.length === 0}>
          Submit Quote
        </Button>
      </div>
    </div>
  );
}