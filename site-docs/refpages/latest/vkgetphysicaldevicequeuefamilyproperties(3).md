# vkGetPhysicalDeviceQueueFamilyProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyProperties - Reports properties of the queues of the specified physical device

To query properties of queues available on a physical device, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceQueueFamilyProperties2](../../../../spec/latest/chapters/devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceQueueFamilyProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pQueueFamilyPropertyCount,
    VkQueueFamilyProperties*                    pQueueFamilyProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pQueueFamilyPropertyCount` is a pointer to an integer related to
the number of queue families available or queried, as described below.

* 
`pQueueFamilyProperties` is either `NULL` or a pointer to an array
of [VkQueueFamilyProperties](VkQueueFamilyProperties.html) structures.

If `pQueueFamilyProperties` is `NULL`, then the number of queue families
available is returned in `pQueueFamilyPropertyCount`.
Implementations **must** support at least one queue family.
Otherwise, `pQueueFamilyPropertyCount` **must** point to a variable set by
the application to the number of elements in the
`pQueueFamilyProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pQueueFamilyProperties`.
If `pQueueFamilyPropertyCount` is less than the number of queue families
available, at most `pQueueFamilyPropertyCount` structures will be
written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyPropertyCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyPropertyCount-parameter

 `pQueueFamilyPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyProperties-parameter

 If the value referenced by `pQueueFamilyPropertyCount` is not `0`, and `pQueueFamilyProperties` is not `NULL`, `pQueueFamilyProperties` **must** be a valid pointer to an array of `pQueueFamilyPropertyCount` [VkQueueFamilyProperties](VkQueueFamilyProperties.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueueFamilyProperties](VkQueueFamilyProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
