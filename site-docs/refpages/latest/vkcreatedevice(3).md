# vkCreateDevice(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDevice.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDevice - Create a new device instance

A logical device is created as a *connection* to a physical device.
To create a logical device, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDevice(
    VkPhysicalDevice                            physicalDevice,
    const VkDeviceCreateInfo*                   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDevice*                                   pDevice);

* 
`physicalDevice` **must** be one of the device handles returned from a
call to `vkEnumeratePhysicalDevices` (see
[Physical Device    Enumeration](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-physical-device-enumeration)).

* 
`pCreateInfo` is a pointer to a [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure
containing information about how to create the device.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pDevice` is a pointer to a handle in which the created
[VkDevice](VkDevice.html) is returned.

`vkCreateDevice` verifies that extensions and features requested in the
`ppEnabledExtensionNames` and `pEnabledFeatures` members of
`pCreateInfo`, respectively, are supported by the implementation.
If any requested extension is not supported, `vkCreateDevice` **must**
return [VK_ERROR_EXTENSION_NOT_PRESENT](VkResult.html).
If any requested feature is not supported, `vkCreateDevice` **must** return
[VK_ERROR_FEATURE_NOT_PRESENT](VkResult.html).
Support for extensions **can** be checked before creating a device by querying
[vkEnumerateDeviceExtensionProperties](vkEnumerateDeviceExtensionProperties.html).
Support for features **can** similarly be checked by querying
[vkGetPhysicalDeviceFeatures](vkGetPhysicalDeviceFeatures.html).

After verifying and enabling the extensions the `VkDevice` object is
created and returned to the application.

Multiple logical devices **can** be created from the same physical device.
Logical device creation **may** fail due to lack of device-specific resources
(in addition to other errors).
If that occurs, `vkCreateDevice` will return
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html).

Valid Usage

* 
[](#VUID-vkCreateDevice-ppEnabledExtensionNames-01387) VUID-vkCreateDevice-ppEnabledExtensionNames-01387

All [required device    extensions](../../../../spec/latest/chapters/extensions.html#extendingvulkan-extensions-extensiondependencies) for each extension in the
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)::`ppEnabledExtensionNames` list **must** also
be present in that list

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDevice-physicalDevice-parameter) VUID-vkCreateDevice-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkCreateDevice-pCreateInfo-parameter) VUID-vkCreateDevice-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDeviceCreateInfo](VkDeviceCreateInfo.html) structure

* 
[](#VUID-vkCreateDevice-pAllocator-parameter) VUID-vkCreateDevice-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDevice-pDevice-parameter) VUID-vkCreateDevice-pDevice-parameter

 `pDevice` **must** be a valid pointer to a [VkDevice](VkDevice.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_FEATURE_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#vkCreateDevice).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
