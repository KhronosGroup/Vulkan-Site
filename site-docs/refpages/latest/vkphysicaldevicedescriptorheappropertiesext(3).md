# VkPhysicalDeviceDescriptorHeapPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDescriptorHeapPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDescriptorHeapPropertiesEXT - Structure describing supported image alignments for a physical device

The `VkPhysicalDeviceDescriptorHeapPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPhysicalDeviceDescriptorHeapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       samplerHeapAlignment;
    VkDeviceSize       resourceHeapAlignment;
    VkDeviceSize       maxSamplerHeapSize;
    VkDeviceSize       maxResourceHeapSize;
    VkDeviceSize       minSamplerHeapReservedRange;
    VkDeviceSize       minSamplerHeapReservedRangeWithEmbedded;
    VkDeviceSize       minResourceHeapReservedRange;
    VkDeviceSize       samplerDescriptorSize;
    VkDeviceSize       imageDescriptorSize;
    VkDeviceSize       bufferDescriptorSize;
    VkDeviceSize       samplerDescriptorAlignment;
    VkDeviceSize       imageDescriptorAlignment;
    VkDeviceSize       bufferDescriptorAlignment;
    VkDeviceSize       maxPushDataSize;
    size_t             imageCaptureReplayOpaqueDataSize;
    uint32_t           maxDescriptorHeapEmbeddedSamplers;
    uint32_t           samplerYcbcrConversionCount;
    VkBool32           sparseDescriptorHeaps;
    VkBool32           protectedDescriptorHeaps;
} VkPhysicalDeviceDescriptorHeapPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `samplerHeapAlignment` specifies the
required alignment of the `heapRange->address` member of
[VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) for binding sampler heaps.
It must be a power-of-two value.

* 
 `resourceHeapAlignment` specifies
the required alignment of the `heapRange->address` member of
[VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) for binding resource heaps.
It must be a power-of-two value.

* 
 `maxSamplerHeapSize` describes maximum
value of the `size` member of [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) for
binding sampler heaps, including the reservation, when embedded samplers
are used.

* 
 `maxResourceHeapSize` describes
maximum value of the `size` member of [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
for binding resource heaps, including the reservation.

* 
 `minSamplerHeapReservedRange`
specifies the minimum amount of data that the implementation needs to be
reserved within the bound sampler heap range when embedded samplers are
not used.

* 

`minSamplerHeapReservedRangeWithEmbedded` specifies the minimum
amount of data that the implementation needs to be reserved within the
bound sampler heap range when embedded samplers are used.

* 

`minResourceHeapReservedRange` specifies the minimum amount of data
that the implementation needs to be reserved within the bound resource
heap range.

* 
 `samplerDescriptorSize` specifies
the size of sampler descriptors written by
[vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html).
It **must** be a power-of-two value.

* 
 `imageDescriptorSize` specifies the
maximum size of image and texel buffer descriptors written by
[vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html).
It **must** be a power-of-two value.

* 
 `bufferDescriptorSize` specifies the
maximum size of unformatted buffer descriptors
or acceleration structures
written by [vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html).
It **must** be a power-of-two value.

* 
 `samplerDescriptorAlignment`
specifies the required alignment of sampler descriptors within a sampler
heap.
It must be a power-of-two value, and less than or equal to
`samplerDescriptorSize`.

* 
 `imageDescriptorAlignment`
specifies the required alignment of image descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`imageDescriptorSize`.

* 
 `bufferDescriptorAlignment`
specifies the required alignment of buffer descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`bufferDescriptorSize`.

* 
 `maxPushDataSize` specifies the maximum
total size of all push data.

* 

`imageCaptureReplayOpaqueDataSize` specifies the size of the opaque
capture/replay data for an image.

* 

`maxDescriptorHeapEmbeddedSamplers` specifies the maximum number of
unique embedded samplers across all pipelines.

* 
 `samplerYcbcrConversionCount`
specifies the number of sampler descriptors required for any sampler
using YCBCR conversion.

* 
 `sparseDescriptorHeaps` specifies
whether descriptor heaps can be backed by sparse memory or not.
If this value is [VK_FALSE](VK_FALSE.html), buffers cannot be specified as both
sparse and having descriptor heap usage.

* 
 `protectedDescriptorHeaps`
specifies whether descriptor heaps can be used with protected
submissions or not.
If this value is `VK_FALSE`, buffers cannot be specified as both
protected and having descriptor heap usage.

If the `VkPhysicalDeviceDescriptorHeapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDescriptorHeapPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
