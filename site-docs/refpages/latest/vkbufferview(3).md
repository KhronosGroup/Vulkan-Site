# VkBufferView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferView - Opaque handle to a buffer view object

A *buffer view* represents a contiguous range of a buffer and a specific
format to be used to interpret the data.
Buffer views are used to enable shaders to access buffer contents using
[image operations](../../../../spec/latest/chapters/textures.html#textures).
In order to create a valid buffer view, the buffer **must** have been created
with at least one of the following usage flags:

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

Buffer views are represented by `VkBufferView` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBufferView)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html), [VkWriteDescriptorSet](VkWriteDescriptorSet.html), [vkCreateBufferView](vkCreateBufferView.html), [vkDestroyBufferView](vkDestroyBufferView.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
