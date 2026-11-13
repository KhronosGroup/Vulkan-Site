# VK_KHR_dedicated_allocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_dedicated_allocation.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_dedicated_allocation](#VK_KHR_dedicated_allocation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.1](#_promotion_to_vulkan_1_1)
- [Promotion_to_Vulkan_1.1](#_promotion_to_vulkan_1_1)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_dedicated_allocation - device extension

**Name String**

`VK_KHR_dedicated_allocation`

**Extension Type**

Device extension

**Registered Extension Number**

128

**Revision**

3

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_dedicated_allocation] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_dedicated_allocation extension*)

**Last Modified Date**

2017-09-05

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Faith Ekstrand, Intel

This extension enables resources to be bound to a dedicated allocation,
rather than suballocated.
For any particular resource, applications **can** query whether a dedicated
allocation is recommended, in which case using a dedicated allocation **may**
improve the performance of access to that resource.
Normal device memory allocations must support multiple resources per
allocation, memory aliasing and sparse binding, which could interfere with
some optimizations.
Applications should query the implementation for when a dedicated allocation
**may** be beneficial by adding a `VkMemoryDedicatedRequirementsKHR`
structure to the `pNext` chain of the `VkMemoryRequirements2`
structure passed as the `pMemoryRequirements` parameter of a call to
`vkGetBufferMemoryRequirements2` or `vkGetImageMemoryRequirements2`.
Certain external handle types and external images or buffers **may** also
depend on dedicated allocations on implementations that associate image or
buffer metadata with OS-level memory objects.

This extension adds a two small structures to memory requirements querying
and memory allocation: a new structure that flags whether an image/buffer
should have a dedicated allocation, and a structure indicating the image or
buffer that an allocation will be bound to.

All functionality in this extension is included in core Vulkan 1.1, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkMemoryDedicatedAllocateInfoKHR](VkMemoryDedicatedAllocateInfo.html)

Extending [VkMemoryRequirements2](VkMemoryRequirements2.html):

* 
[VkMemoryDedicatedRequirementsKHR](VkMemoryDedicatedRequirements.html)

* 
`VK_KHR_DEDICATED_ALLOCATION_EXTENSION_NAME`

* 
`VK_KHR_DEDICATED_ALLOCATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS_KHR](VkStructureType.html)

    // Create an image with a dedicated allocation based on the
    // implementation's preference

    VkImageCreateInfo imageCreateInfo =
    {
        // Image creation parameters
    };

    VkImage image;
    VkResult result = vkCreateImage(
        device,
        &imageCreateInfo,
        NULL,               // pAllocator
        &image);

    VkMemoryDedicatedRequirementsKHR dedicatedRequirements =
    {
        .sType = VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS_KHR,
        .pNext = NULL,
    };

    VkMemoryRequirements2 memoryRequirements =
    {
        .sType = VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2,
        .pNext = &dedicatedRequirements,
    };

    const VkImageMemoryRequirementsInfo2 imageRequirementsInfo =
    {
        .sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2,
        .pNext = NULL,
        .image = image
    };

    vkGetImageMemoryRequirements2(
        device,
        &imageRequirementsInfo,
        &memoryRequirements);

    if (dedicatedRequirements.prefersDedicatedAllocation) {
        // Allocate memory with VkMemoryDedicatedAllocateInfoKHR::image
        // pointing to the image we are allocating the memory for

        VkMemoryDedicatedAllocateInfoKHR dedicatedInfo =
        {
            .sType = VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_KHR,
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
    } else {
        // Take the normal memory sub-allocation path
    }

* 
Revision 1, 2017-02-27 (James Jones)

Copy content from VK_NV_dedicated_allocation

* 
Add some references to external object interactions to the overview.

Revision 2, 2017-03-27 (Faith Ekstrand)

* 
Rework the extension to be query-based

Revision 3, 2017-07-31 (Faith Ekstrand)

* 
Clarify that memory objects allocated with
VkMemoryDedicatedAllocateInfoKHR can only have the specified resource
bound and no others.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_dedicated_allocation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
