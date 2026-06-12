# vkBindImageMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindImageMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindImageMemory - Bind device memory to an image object

To attach memory to a `VkImage` object created without the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set, call:

// Provided by VK_VERSION_1_0
VkResult vkBindImageMemory(
    VkDevice                                    device,
    VkImage                                     image,
    VkDeviceMemory                              memory,
    VkDeviceSize                                memoryOffset);

* 
`device` is the logical device that owns the image and memory.

* 
`image` is the image.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the image.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified image.

`vkBindImageMemory` is equivalent to passing the same parameters through
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html) to [vkBindImageMemory2](vkBindImageMemory2.html).

Valid Usage

* 
[](#VUID-vkBindImageMemory-image-07460) VUID-vkBindImageMemory-image-07460

`image` **must** not have been bound to a memory object

* 
[](#VUID-vkBindImageMemory-image-01045) VUID-vkBindImageMemory-image-01045

`image` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-vkBindImageMemory-memoryOffset-01046) VUID-vkBindImageMemory-memoryOffset-01046

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-vkBindImageMemory-image-01445) VUID-vkBindImageMemory-image-01445

If `image` requires a dedicated allocation (as reported by
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) in
[VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)::`requiresDedicatedAllocation`
for `image`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` equal to `image`

* 
[](#VUID-vkBindImageMemory-memory-02628) VUID-vkBindImageMemory-memory-02628

If
the [    `dedicatedAllocationImageAliasing`](../../../../spec/latest/chapters/features.html#features-dedicatedAllocationImageAliasing) feature is not enabled, and
the `VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `image` **must** equal
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` and `memoryOffset`
**must** be zero

* 
[](#VUID-vkBindImageMemory-memory-02629) VUID-vkBindImageMemory-memory-02629

If the [    `dedicatedAllocationImageAliasing`](../../../../spec/latest/chapters/features.html#features-dedicatedAllocationImageAliasing) feature is enabled, and the
`VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image`
was not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `memoryOffset` **must** be zero, and
`image` **must** be either equal to
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`image` or an image that was
created using the same parameters in [VkImageCreateInfo](VkImageCreateInfo.html), with the
exception that `extent` and `arrayLayers` **may** differ subject to
the following restrictions: every dimension in the `extent`
parameter of the image being bound **must** be equal to or smaller than the
original image for which the allocation was created; and the
`arrayLayers` parameter of the image being bound **must** be equal to
or smaller than the original image for which the allocation was created

* 
[](#VUID-vkBindImageMemory-memory-10926) VUID-vkBindImageMemory-memory-10926

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)::`buffer`
**must** have been [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkBindImageMemory-None-01901) VUID-vkBindImageMemory-None-01901

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) bit
set, the image **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-vkBindImageMemory-None-01902) VUID-vkBindImageMemory-None-01902

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html) bit
not set, the image **must** not be bound to a memory object created with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-vkBindImageMemory-image-01050) VUID-vkBindImageMemory-image-01050

If `image` was created with
[VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)::`dedicatedAllocation`
equal to [VK_TRUE](VK_TRUE.html), `memory` **must** have been created with
[VkDedicatedAllocationMemoryAllocateInfoNV](VkDedicatedAllocationMemoryAllocateInfoNV.html)::`image` equal to an
image handle created with identical creation parameters to `image`
and `memoryOffset` **must** be zero

* 
[](#VUID-vkBindImageMemory-apiVersion-07921) VUID-vkBindImageMemory-apiVersion-07921

    If
    the [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html) extension is not enabled,
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
    1.1,
and
    `image` was not created with
    [VkDedicatedAllocationImageCreateInfoNV](VkDedicatedAllocationImageCreateInfoNV.html)::`dedicatedAllocation`
    equal to [VK_TRUE](VK_TRUE.html), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-vkBindImageMemory-memory-02728) VUID-vkBindImageMemory-memory-02728

If the value of [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-memory-02989) VUID-vkBindImageMemory-memory-02989

If `memory` was created by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-memory-02990) VUID-vkBindImageMemory-memory-02990

If `memory` was created with the
[VkImportAndroidHardwareBufferInfoANDROID](VkImportAndroidHardwareBufferInfoANDROID.html) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](VkExternalMemoryHandleTypeFlagBits.html)
**must** also have been set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-image-08113) VUID-vkBindImageMemory-image-08113

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindImageMemory-image-09202) VUID-vkBindImageMemory-image-09202

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) bit set

* 
[](#VUID-vkBindImageMemory-image-01608) VUID-vkBindImageMemory-image-01608

`image` **must** not have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set

* 
[](#VUID-vkBindImageMemory-memory-01047) VUID-vkBindImageMemory-memory-01047

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
[vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html) with `image`

* 
[](#VUID-vkBindImageMemory-None-10735) VUID-vkBindImageMemory-None-10735

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to [vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html) with `image`

* 
[](#VUID-vkBindImageMemory-memory-10736) VUID-vkBindImageMemory-memory-10736

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image`

* 
[](#VUID-vkBindImageMemory-None-10737) VUID-vkBindImageMemory-None-10737

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set,
`size` member of the `VkMemoryRequirements` structure returned
from a call to `vkGetImageMemoryRequirements` with `image` **must**
be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-vkBindImageMemory-memory-10738) VUID-vkBindImageMemory-memory-10738

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property set, `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-vkBindImageMemory-image-06392) VUID-vkBindImageMemory-image-06392

If `image` was created with
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html) chained to
[VkImageCreateInfo](VkImageCreateInfo.html)::`pNext`, `memory` **must** be allocated
with a [VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html) chained to
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)::`pNext`

Valid Usage (Implicit)

* 
[](#VUID-vkBindImageMemory-device-parameter) VUID-vkBindImageMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindImageMemory-image-parameter) VUID-vkBindImageMemory-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkBindImageMemory-memory-parameter) VUID-vkBindImageMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkBindImageMemory-image-parent) VUID-vkBindImageMemory-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindImageMemory-memory-parent) VUID-vkBindImageMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkImage](VkImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkBindImageMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
