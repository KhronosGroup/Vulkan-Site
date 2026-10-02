# VkVideoSessionMemoryRequirementsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionMemoryRequirementsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionMemoryRequirementsKHR - Structure describing video session memory requirements

The `VkVideoSessionMemoryRequirementsKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoSessionMemoryRequirementsKHR {
    VkStructureType         sType;
    void*                   pNext;
    uint32_t                memoryBindIndex;
    VkMemoryRequirements    memoryRequirements;
} VkVideoSessionMemoryRequirementsKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryBindIndex` is the index of the memory binding.

* 
`memoryRequirements` is a [VkMemoryRequirements](VkMemoryRequirements.html) structure in
which the requested memory binding requirements for the binding index
specified by `memoryBindIndex` are returned.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoSessionMemoryRequirementsKHR-sType-sType) VUID-VkVideoSessionMemoryRequirementsKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_SESSION_MEMORY_REQUIREMENTS_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoSessionMemoryRequirementsKHR-pNext-pNext) VUID-VkVideoSessionMemoryRequirementsKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkMemoryRequirements](VkMemoryRequirements.html), [VkStructureType](VkStructureType.html), [vkGetVideoSessionMemoryRequirementsKHR](vkGetVideoSessionMemoryRequirementsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionMemoryRequirementsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
