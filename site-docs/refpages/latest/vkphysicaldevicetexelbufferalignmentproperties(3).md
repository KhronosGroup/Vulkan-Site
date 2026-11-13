# VkPhysicalDeviceTexelBufferAlignmentProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTexelBufferAlignmentProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTexelBufferAlignmentProperties - Structure describing the texel buffer alignment requirements supported by an implementation

The `VkPhysicalDeviceTexelBufferAlignmentProperties` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceTexelBufferAlignmentProperties {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       storageTexelBufferOffsetAlignmentBytes;
    VkBool32           storageTexelBufferOffsetSingleTexelAlignment;
    VkDeviceSize       uniformTexelBufferOffsetAlignmentBytes;
    VkBool32           uniformTexelBufferOffsetSingleTexelAlignment;
} VkPhysicalDeviceTexelBufferAlignmentProperties;

// Provided by VK_EXT_texel_buffer_alignment
// Equivalent to VkPhysicalDeviceTexelBufferAlignmentProperties
typedef VkPhysicalDeviceTexelBufferAlignmentProperties VkPhysicalDeviceTexelBufferAlignmentPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`storageTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a storage texel buffer of any format.
The value **must** be a power of two.

* 

`storageTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a storage texel buffer of any
format.

* 

`uniformTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a uniform texel buffer of any format.
The value **must** be a power of two.

* 

`uniformTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a uniform texel buffer of any
format.

If the `VkPhysicalDeviceTexelBufferAlignmentProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

If the single texel alignment property is [VK_FALSE](VK_FALSE.html), then the buffer
view’s offset **must** be aligned to the corresponding byte alignment value.
If the single texel alignment property is [VK_TRUE](VK_TRUE.html), then the buffer
view’s offset **must** be aligned to the lesser of the corresponding byte
alignment value or the size of a single texel, based on
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)::`format`.
If the size of a single texel is a multiple of three bytes, then the size of
a single component of the format is used instead.

These limits **must** not advertise a larger alignment than the
[required](../../../../spec/latest/chapters/limits.html#limits-required) maximum minimum value of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`minTexelBufferOffsetAlignment`, for any
format that supports use as a texel buffer.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTexelBufferAlignmentProperties-sType-sType) VUID-VkPhysicalDeviceTexelBufferAlignmentProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_texel_buffer_alignment](VK_EXT_texel_buffer_alignment.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceTexelBufferAlignmentProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
