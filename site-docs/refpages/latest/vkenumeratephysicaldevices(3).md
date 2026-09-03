# vkEnumeratePhysicalDevices(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkEnumeratePhysicalDevices.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkEnumeratePhysicalDevices - Enumerates the physical devices accessible to a Vulkan instance

To retrieve a list of physical device objects representing the physical
devices installed in the system, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumeratePhysicalDevices(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceCount,
    VkPhysicalDevice*                           pPhysicalDevices);

* 
`instance` is a handle to a Vulkan instance previously created with
[vkCreateInstance](vkCreateInstance.html).

* 
`pPhysicalDeviceCount` is a pointer to an integer related to the
number of physical devices available or queried, as described below.

* 
`pPhysicalDevices` is either `NULL` or a pointer to an array of
`VkPhysicalDevice` handles.

If `pPhysicalDevices` is `NULL`, then the number of physical devices
available is returned in `pPhysicalDeviceCount`.
Otherwise, `pPhysicalDeviceCount` **must** point to a variable set by the
application to the number of elements in the `pPhysicalDevices` array,
and on return the variable is overwritten with the number of handles
actually written to `pPhysicalDevices`.
If `pPhysicalDeviceCount` is less than the number of physical devices
available, at most `pPhysicalDeviceCount` structures will be written,
and [VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available physical devices were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDevices-instance-parameter) VUID-vkEnumeratePhysicalDevices-instance-parameter

 `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkEnumeratePhysicalDevices-pPhysicalDeviceCount-parameter) VUID-vkEnumeratePhysicalDevices-pPhysicalDeviceCount-parameter

 `pPhysicalDeviceCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDevices-pPhysicalDevices-parameter) VUID-vkEnumeratePhysicalDevices-pPhysicalDevices-parameter

 If the value referenced by `pPhysicalDeviceCount` is not `0`, and `pPhysicalDevices` is not `NULL`, `pPhysicalDevices` **must** be a valid pointer to an array of `pPhysicalDeviceCount` [VkPhysicalDevice](VkPhysicalDevice.html) handles

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkInstance](VkInstance.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkEnumeratePhysicalDevices).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
