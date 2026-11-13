# VkDescriptorAddressInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorAddressInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorAddressInfoEXT - Structure specifying descriptor buffer address info

Data describing a [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor is passed in a
`VkDescriptorAddressInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorAddressInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceAddress    address;
    VkDeviceSize       range;
    VkFormat           format;
} VkDescriptorAddressInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is either `0` or a device address at an offset in a
buffer, where the base address can be queried from
[vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html).

* 
`range` is the size in bytes of the buffer or buffer view used by
the descriptor.

* 
`format` is the format of the data elements in the buffer view and
is ignored for buffers.

Valid Usage

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-09508) VUID-VkDescriptorAddressInfoEXT-None-09508

If
`address` is not zero, and
the descriptor is of type [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html)
or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), then `format`
**must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-08043) VUID-VkDescriptorAddressInfoEXT-address-08043

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled,
`address` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938

If `address` is zero, `range` **must** be [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html)

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939

If `address` is not zero,
`range` **must** not be [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html)

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08045) VUID-VkDescriptorAddressInfoEXT-range-08045

If `address` is not zero, then `range` **must** be less than or
equal to the size of the buffer containing `address` minus the
offset of `address` from the base address of the buffer

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08940) VUID-VkDescriptorAddressInfoEXT-range-08940

`range` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-12271) VUID-VkDescriptorAddressInfoEXT-None-12271

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](../../../../spec/latest/chapters/features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorAddressInfoEXT-sType-sType) VUID-VkDescriptorAddressInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDescriptorAddressInfoEXT-pNext-pNext) VUID-VkDescriptorAddressInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-parameter) VUID-VkDescriptorAddressInfoEXT-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDescriptorAddressInfoEXT-format-parameter) VUID-VkDescriptorAddressInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
`address` **can** be zero.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorDataEXT](VkDescriptorDataEXT.html), `VkDeviceAddress`, `VkDeviceSize`, [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkDescriptorAddressInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
