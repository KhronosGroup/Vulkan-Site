# VK_NV_dedicated_allocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_dedicated_allocation.html

## Table of Contents

- [Name](#_name)
- [VK_NV_dedicated_allocation](#VK_NV_dedicated_allocation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_dedicated_allocation - device extension

**Name String**

`VK_NV_dedicated_allocation`

**Extension Type**

Device extension

**Registered Extension Number**

27

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)
extension

Which in turn was *promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_dedicated_allocation] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_dedicated_allocation extension*)

**Last Modified Date**

2016-05-31

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension allows device memory to be allocated for a particular buffer
or image resource, which on some devices can significantly improve the
performance of that resource.
Normal device memory allocations must support memory aliasing and sparse
binding, which could interfere with optimizations like framebuffer
compression or efficient page table usage.
This is important for render targets and very large resources, but need not
(and probably should not) be used for smaller resources that can benefit
from suballocation.

This extension adds a few small structures to resource creation and memory
allocation: a new structure that flags whether am image/buffer will have a
dedicated allocation, and a structure indicating the image or buffer that an
allocation will be bound to.

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

[VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html)

* 
`VK_NV_DEDICATED_ALLOCATION_EXTENSION_NAME`

* 
`VK_NV_DEDICATED_ALLOCATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_BUFFER_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_MEMORY_ALLOCATE_INFO_NV](VkStructureType.html)

    // Create an image with
    // VkDedicatedAllocationImageCreateInfoNV::dedicatedAllocation
    // set to VK_TRUE

    VkDedicatedAllocationImageCreateInfoNV dedicatedImageInfo =
    {
        .sType = VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV,
        .pNext = NULL,
        .dedicatedAllocation = VK_TRUE,
    };

    VkImageCreateInfo imageCreateInfo =
    {
        .sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,
        .pNext = &dedicatedImageInfo
        // Other members set as usual
    };

    VkImage image;
    VkResult result = vkCreateImage(
        device,
        &imageCreateInfo,
        NULL,               // pAllocator
        &image);

    VkMemoryRequirements memoryRequirements;
    vkGetImageMemoryRequirements(
        device,
        image,
        &memoryRequirements);

    // Allocate memory with VkDedicatedAllocationMemoryAllocateInfoNV::image
    // pointing to the image we are allocating the memory for

    VkDedicatedAllocationMemoryAllocateInfoNV dedicatedInfo =
    {
        .sType = VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_MEMORY_ALLOCATE_INFO_NV,
        .pNext = NULL,
        .image = image,
        .buffer = VK_NULL_HANDLE,
    };

    VkMemoryAllocateInfo memoryAllocateInfo =
    {
        .sType = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO,
        .pNext = &dedicatedInfo,
        .allocationSize = memoryRequirements.size,
        .memoryTypeIndex = FindMemoryTypeIndex(memoryRequirements.memoryTypeBits),
    };

    VkDeviceMemory memory;
    vkAllocateMemory(
        device,
        &memoryAllocateInfo,
        NULL,               // pAllocator
        &memory);

    // Bind the image to the memory

    vkBindImageMemory(
        device,
        image,
        memory,
        0);

* 
Revision 1, 2016-05-31 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_dedicated_allocation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
