# VkDeviceBufferMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceBufferMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceBufferMemoryRequirements - (None)

The `VkDeviceBufferMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDeviceBufferMemoryRequirements {
    VkStructureType              sType;
    const void*                  pNext;
    const VkBufferCreateInfo*    pCreateInfo;
} VkDeviceBufferMemoryRequirements;

// Provided by VK_KHR_maintenance4
// Equivalent to VkDeviceBufferMemoryRequirements
typedef VkDeviceBufferMemoryRequirements VkDeviceBufferMemoryRequirementsKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkBufferCreateInfo](VkBufferCreateInfo.html) structure
containing parameters affecting creation of the buffer to query.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceBufferMemoryRequirements-sType-sType) VUID-VkDeviceBufferMemoryRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS](VkStructureType.html)

* 
[](#VUID-VkDeviceBufferMemoryRequirements-pNext-pNext) VUID-VkDeviceBufferMemoryRequirements-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceBufferMemoryRequirements-pCreateInfo-parameter) VUID-VkDeviceBufferMemoryRequirements-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCreateInfo](VkBufferCreateInfo.html) structure

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkStructureType](VkStructureType.html), [vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html), [vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDeviceBufferMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
