# vkEnumeratePhysicalDeviceGroups(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumeratePhysicalDeviceGroups.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumeratePhysicalDeviceGroups - Enumerates groups of physical devices that can be used to create a single logical device

To retrieve a list of the device groups present in the system, call:

// Provided by VK_VERSION_1_1
VkResult vkEnumeratePhysicalDeviceGroups(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceGroupCount,
    VkPhysicalDeviceGroupProperties*            pPhysicalDeviceGroupProperties);

// Provided by VK_KHR_device_group_creation
// Equivalent to vkEnumeratePhysicalDeviceGroups
VkResult vkEnumeratePhysicalDeviceGroupsKHR(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceGroupCount,
    VkPhysicalDeviceGroupProperties*            pPhysicalDeviceGroupProperties);

* 
`instance` is a handle to a Vulkan instance previously created with
[vkCreateInstance](vkCreateInstance.html).

* 
`pPhysicalDeviceGroupCount` is a pointer to an integer related to
the number of device groups available or queried, as described below.

* 
`pPhysicalDeviceGroupProperties` is either `NULL` or a pointer to an
array of [VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html) structures.

If `pPhysicalDeviceGroupProperties` is `NULL`, then the number of device
groups available is returned in `pPhysicalDeviceGroupCount`.
Otherwise, `pPhysicalDeviceGroupCount` **must** point to a variable set by
the application to the number of elements in the
`pPhysicalDeviceGroupProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pPhysicalDeviceGroupProperties`.
If `pPhysicalDeviceGroupCount` is less than the number of device groups
available, at most `pPhysicalDeviceGroupCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available device groups were
returned.

Every physical device **must** be in exactly one device group.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-instance-parameter) VUID-vkEnumeratePhysicalDeviceGroups-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupCount-parameter) VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupCount-parameter

 `pPhysicalDeviceGroupCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupProperties-parameter) VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupProperties-parameter

 If the value referenced by `pPhysicalDeviceGroupCount` is not `0`, and `pPhysicalDeviceGroupProperties` is not `NULL`, `pPhysicalDeviceGroupProperties` **must** be a valid pointer to an array of `pPhysicalDeviceGroupCount` [VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkInstance](VkInstance.html), [VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkEnumeratePhysicalDeviceGroups).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
