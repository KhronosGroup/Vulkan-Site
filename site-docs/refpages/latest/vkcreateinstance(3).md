# vkCreateInstance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateInstance.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateInstance - Create a new Vulkan instance

To create an instance object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateInstance(
    const VkInstanceCreateInfo*                 pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkInstance*                                 pInstance);

* 
`pCreateInfo` is a pointer to a [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure
controlling creation of the instance.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pInstance` points a [VkInstance](VkInstance.html) handle in which the resulting
instance is returned.

`vkCreateInstance` verifies that the requested layers exist.
If not, `vkCreateInstance` will return [VK_ERROR_LAYER_NOT_PRESENT](VkResult.html).
Next `vkCreateInstance` verifies that the requested extensions are
supported (e.g. in the implementation or in any enabled instance layer) and
if any requested extension is not supported, `vkCreateInstance` **must**
return [VK_ERROR_EXTENSION_NOT_PRESENT](VkResult.html).
After verifying and enabling the instance layers and extensions the
`VkInstance` object is created and returned to the application.
If a requested extension is only supported by a layer, both the layer and
the extension need to be specified at `vkCreateInstance` time for the
creation to succeed.

Valid Usage

* 
[](#VUID-vkCreateInstance-ppEnabledExtensionNames-01388) VUID-vkCreateInstance-ppEnabledExtensionNames-01388

All [required    extensions](../../../../spec/latest/chapters/extensions.html#extendingvulkan-extensions-extensiondependencies) for each extension in the
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)::`ppEnabledExtensionNames` list **must**
also be present in that list

Valid Usage (Implicit)

* 
[](#VUID-vkCreateInstance-pCreateInfo-parameter) VUID-vkCreateInstance-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure

* 
[](#VUID-vkCreateInstance-pAllocator-parameter) VUID-vkCreateInstance-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateInstance-pInstance-parameter) VUID-vkCreateInstance-pInstance-parameter

 `pInstance` **must** be a valid pointer to a [VkInstance](VkInstance.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_INCOMPATIBLE_DRIVER](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_LAYER_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkInstance](VkInstance.html), [VkInstanceCreateInfo](VkInstanceCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#vkCreateInstance).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
