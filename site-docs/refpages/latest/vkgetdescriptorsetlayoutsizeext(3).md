# vkGetDescriptorSetLayoutSizeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorSetLayoutSizeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorSetLayoutSizeEXT - Get the size of a descriptor set layout in memory

To determine the amount of memory needed to store all descriptors with a
given layout, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutSizeEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    VkDeviceSize*                               pLayoutSizeInBytes);

* 
`device` is the logical device that gets the size.

* 
`layout` is the descriptor set layout being queried.

* 
`pLayoutSizeInBytes` is a pointer to `VkDeviceSize` where the
size in bytes will be written.

The size of a descriptor set layout will be at least as large as the sum
total of the size of all descriptors in the layout, and **may** be larger.
This size represents the amount of memory that will be required to store all
of the descriptors for this layout in memory, when placed according to the
layout’s offsets as obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](vkGetDescriptorSetLayoutBindingOffsetEXT.html).

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), the returned size
includes space for the maximum `descriptorCount` descriptors as declared
for that `binding`.
To compute the required size of a descriptor set with a
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html):

size = offset + descriptorSize ×
variableDescriptorCount

where offset is obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](vkGetDescriptorSetLayoutBindingOffsetEXT.html) and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html), and
variableDescriptorCount is the equivalent of
[VkDescriptorSetVariableDescriptorCountAllocateInfo](VkDescriptorSetVariableDescriptorCountAllocateInfo.html)::`pDescriptorCounts`.
For [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html),
variableDescriptorCount is the size in bytes for the inline uniform
block, and descriptorSize is 1.

If
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`combinedImageSamplerDescriptorSingleArray`
is [VK_FALSE](VK_FALSE.html) and the variable descriptor type is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
variableDescriptorCount is always considered to be the upper bound.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011) VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter

 `pLayoutSizeInBytes` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDevice](VkDevice.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetDescriptorSetLayoutSizeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
