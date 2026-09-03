# vkGetDescriptorSetLayoutBindingOffsetEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorSetLayoutBindingOffsetEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorSetLayoutBindingOffsetEXT - Get the offset of a binding within a descriptor set layout

To get the offset of a binding within a descriptor set layout in memory,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutBindingOffsetEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    uint32_t                                    binding,
    VkDeviceSize*                               pOffset);

* 
`device` is the logical device that gets the offset.

* 
`layout` is the descriptor set layout being queried.

* 
`binding` is the binding number being queried.

* 
`pOffset` is a pointer to `VkDeviceSize` where the byte
offset of the binding will be written.

Each binding in a descriptor set layout is assigned an offset in memory by
the implementation.
When a shader accesses a resource with that binding, it will access the
bound descriptor buffer from that offset to look for its descriptor.
This command provides an application with that offset, so that descriptors
can be placed in the correct locations.
The precise location accessed by a shader for a given descriptor is as
follows:

location = bufferAddress +  setOffset + 
descriptorOffset +  (arrayElement × descriptorSize)

where bufferAddress and setOffset are the base address and
offset for the identified descriptor set as specified by
[vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html) and
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), descriptorOffset is the
offset for the binding returned by this command, arrayElement is the
index into the array specified in the shader, and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html).
Applications are responsible for placing valid descriptors at the expected
location in order for a shader to access it.
The overall offset added to bufferAddress to calculate location
**must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxSamplerDescriptorBufferRange`
for samplers and
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxResourceDescriptorBufferRange`
for resources.

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), that
`binding` **must** have the largest offset of any `binding`.

A descriptor `binding` with type [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)
**can** be used.
Any potential types in
[VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)::`pDescriptorTypes` for
`binding` share the same offset.
If the size of the [mutable descriptor](../../../../spec/latest/chapters/descriptors.html#descriptors-mutable) is larger
than the size of a concrete descriptor type being accessed, the padding area
is ignored by the implementation.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter

 `pOffset` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDevice](VkDevice.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetDescriptorSetLayoutBindingOffsetEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
