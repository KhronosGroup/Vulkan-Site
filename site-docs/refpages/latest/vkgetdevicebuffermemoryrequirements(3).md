# vkGetDeviceBufferMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceBufferMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceBufferMemoryRequirements - Returns the memory requirements for specified Vulkan object

To determine the memory requirements for a buffer resource without creating
an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceBufferMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceBufferMemoryRequirements*     pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceBufferMemoryRequirements
void vkGetDeviceBufferMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceBufferMemoryRequirements*     pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the buffer.

* 
`pInfo` is a pointer to a [VkDeviceBufferMemoryRequirements](VkDeviceBufferMemoryRequirements.html)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-device-parameter) VUID-vkGetDeviceBufferMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceBufferMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceBufferMemoryRequirements](VkDeviceBufferMemoryRequirements.html) structure

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetDeviceBufferMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkDevice](VkDevice.html), [VkDeviceBufferMemoryRequirements](VkDeviceBufferMemoryRequirements.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetDeviceBufferMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
