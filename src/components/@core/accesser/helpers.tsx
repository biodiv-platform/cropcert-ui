import { getByRole } from "@services/accessor.service";
import { ROLE_HIERARCHY } from "@static/constants";
import { getUserKey } from "@utils/auth";

/**
 * Returns index of given role name
 *
 * @param {string} role
 * @returns {number}
 */
const roleToIndex = (role: string): number =>
  ROLE_HIERARCHY.findIndex((currentRole) => currentRole === role);

/**
 * Returns sliced array of roles that will represent hierarchy of roles
 *
 * @param {string} fromRole
 * @param {string} toRole
 * @returns {string[]}
 */
export const getDropdownArray = (fromRole: string, toRole: string): string[] => {
  const iStart = roleToIndex(fromRole);
  const iEnd = roleToIndex(toRole) + 1;
  return iStart === iEnd ? [fromRole] : ROLE_HIERARCHY.slice(iStart, iEnd);
};

/**
 * Iterates through roles path array and prepares default dropdown options and values
 *
 * @param {string[]} roles
 * @returns {Promise<{ options; values }>}
 */
export const getInitialOptionsAndValues = async (roles: string[]): Promise<{ options; values }> => {
  let options = {};
  let values = {};
  for (const role of roles) {
    const opts = await getByRole(role);
    const initialRoleCode = getUserKey(`${role}Code`);
    options = { ...options, [role]: opts };
    values = {
      ...values,
      [role]:
        initialRoleCode > 0
          ? opts.find((o) => o.value === initialRoleCode)
          : opts.length > 0
          ? opts[0]
          : undefined,
    };
  }
  return { options, values };
};

export const getHighestPriorityRole = (roles) => {
  // Filter roles that exist in ROLE_HIERARCHY and find the one with the highest priority.
  return (
    roles
      ?.filter((role) => ROLE_HIERARCHY.includes(role))
      .sort((a, b) => ROLE_HIERARCHY.indexOf(a) - ROLE_HIERARCHY.indexOf(b))[0] || null
  );
};
