/**
 * Simulates an API call to check if a domain is available.
 * @param domain - The domain to check (e.g., "example.com").
 * @returns A promise that resolves to a boolean indicating availability.
 */
export const isDomainAvailable = async (domain: string): Promise<boolean> => {
  // Simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Predefined list of domains and their availability status
  const domainAvailabilityMap: Record<string, boolean> = {
    'example.com': false, // Always unavailable
    'test.com': true, // Always available
    'awesome.app': true, // Always available
    'unavailable.xyz': false, // Always unavailable
  };

  // Check if the domain is in the predefined list
  if (domain in domainAvailabilityMap) {
    return domainAvailabilityMap[domain];
  }

  // For other domains, randomly return true or false
  return Math.random() > 0.5;
};