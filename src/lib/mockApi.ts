/**
 * Simulates an API call to check if a domain is available.
 * @param domain 
 * @returns
 */
export const isDomainAvailable = async (domain: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const domainAvailabilityMap: Record<string, boolean> = {
    'example.com': false,
    'test.com': true,
    'awesome.app': true,
    'unavailable.xyz': false,
  };

  if (domain in domainAvailabilityMap) {
    return domainAvailabilityMap[domain];
  }

  return Math.random() > 0.5;
};
