# VK_DEFINE_HANDLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_DEFINE_HANDLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_DEFINE_HANDLE - Declare a dispatchable object handle

`VK_DEFINE_HANDLE` defines a [dispatchable handle](../../../../spec/latest/chapters/fundamentals.html#fundamentals-objectmodel-overview) type.

// Provided by VK_VERSION_1_0
#define VK_DEFINE_HANDLE(object) typedef struct object##_T* object;

* 
`object` is the name of the resulting C type.

The only dispatchable handle types are those related to device and instance
management, such as [VkDevice](VkDevice.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDevice](VkDevice.html), [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html), [VkInstance](VkInstance.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#VK_DEFINE_HANDLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
