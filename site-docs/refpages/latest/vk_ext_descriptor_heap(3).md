# VK_EXT_descriptor_heap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_descriptor_heap.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_descriptor_heap](#VK_EXT_descriptor_heap)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_descriptor_heap - device extension

**Name String**

`VK_EXT_descriptor_heap`

**Extension Type**

Device extension

**Registered Extension Number**

136

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_maintenance5](VK_KHR_maintenance5.html)

and

     [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**API Interactions**

* 
Interacts with VK_ARM_tensors

* 
Interacts with VK_EXT_custom_border_color

* 
Interacts with VK_EXT_device_generated_commands

* 
Interacts with VK_EXT_fragment_density_map

* 
Interacts with VK_EXT_shader_object

* 
Interacts with VK_KHR_ray_tracing_pipeline

* 
Interacts with VK_NV_device_generated_commands

* 
Interacts with VK_NV_ray_tracing

**SPIR-V Dependencies**

* 
[SPV_EXT_descriptor_heap](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_descriptor_heap.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_descriptor_heap] @tobski%0A*Here describe the issue or question you have about the VK_EXT_descriptor_heap extension*)

**Extension Proposal**

[VK_EXT_descriptor_heap](../../../../features/latest/features/proposals/VK_EXT_descriptor_heap.html)

**Last Modified Date**

2024-06-12

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Jan-Harald Fredriksen, Arm

* 
Daniel Story, Nintendo

* 
Connor Abbot, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Matthew Netsch, Qualcomm

* 
Jeff Bolz, NVIDIA

* 
Alyssa Rosenzweig, Valve

* 
Lionel Landerwerlin, Intel

* 
Baldur Karlsson, Valve

* 
Faith Ekstrand, Collabora

* 
Slawomir Grajewski, Intel

* 
Mike Blumenkrantz, Valve

* 
Yiwei Zhang, Google

* 
Stu Smith, AMD

* 
Piers Daniell, NVIDIA

* 
Jon Leech, Khronos

* 
Rodrigo Locatti, NVIDIA

* 
Krzysztof Niski, NVIDIA

* 
Alan Baker, Google

* 
James Fitzpatrick, Imagination

* 
Samuel (Sheng-Wen) Huang, Mediatek

* 
Hai Nguyen, Google

* 
Jeff Leger, Qualcomm

* 
Marty Johnson, Khronos

* 
Tom Olson, Arm

* 
Chris Glover, Google

* 
Daniel Koch, NVIDIA

* 
Robert Simpson, Qualcomm

* 
Dan Ginsburg, Valve

* 
Andreas Süßenbach, NVIDIA

* 
Anna Maniscalco, Valve

* 
Artem Kharytoniuk, LunarG

* 
Younggwan Kim, Arm

* 
Konstantin Seurer, Valve

* 
Catarina Shablia, Collabora

* 
Spencer Fricke, LunarG

* 
Chris Bieneman, Microsoft

* 
Ting Wei, Arm

* 
Boris Zanin, AMD

* 
Samuel Pitoiset, Valve

* 
Erik Hogeman, Arm

* 
Jesse Natalie, Microsoft

* 
Guang Xu, AMD

* 
Embla Flatlandsmo, Arm

**Interactions and External Dependencies**

* 
[VK_KHR_shader_untyped_pointers](VK_KHR_shader_untyped_pointers.html) must be supported, but it does not
need to be enabled for applications using only the
[binding interface](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings).

This extension allows explicit management of descriptors, and the memory
used to store descriptors, conceptualised as descriptor heaps.
Descriptor heap memory can be accessed as any other memory, enabling
management of descriptors on both CPU and the GPU.

This extension was developed based on issues discovered with
[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html).
There are more constraints on how it is implemented, to provide more
portable guarantees and more predictable performance characteristics.
For instance, rather than an arbitrary number of sampler or resource
buffers, there is exactly one sampler heap and exactly one resource heap.

This extension also eliminates descriptor sets and pipeline layouts
completely; instead applications can look descriptors up solely by their
offset into a heap.
Shaders still using descriptor set and binding decorations can still be
mapped to heaps through an API that maps set and binding decorations to heap
offsets, either as constants or through push data.
This new mapping API also enables a much more straightforward mapping to
HLSL shaders using the root signature and descriptor table interfaces.

The push constant API has also been replaced with the *push data* interface,
which aims to provide much more clarity about how data is passed to the
shader, without requiring any mapping information to be provided during
pipeline or shader creation.
Mappings are still available for shaders written for the legacy interface.

There is also a much clearer path for mapping shader constant data, with two
recommended options for mapping constant data through push data; either
directly in push data, or through a device address stored in push data, both
of which can be mapped to shaders with set and binding interfaces.

* 
[VkTensorARM](VkTensorARM.html)

* 
[vkCmdBindResourceHeapEXT](vkCmdBindResourceHeapEXT.html)

* 
[vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html)

* 
[vkCmdPushDataEXT](vkCmdPushDataEXT.html)

* 
[vkGetImageOpaqueCaptureDataEXT](vkGetImageOpaqueCaptureDataEXT.html)

* 
[vkGetPhysicalDeviceDescriptorSizeEXT](vkGetPhysicalDeviceDescriptorSizeEXT.html)

* 
[vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html)

* 
[vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html)

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
[vkGetTensorOpaqueCaptureDataARM](vkGetTensorOpaqueCaptureDataARM.html)

If [VK_EXT_custom_border_color](VK_EXT_custom_border_color.html) is supported:

* 
[vkRegisterCustomBorderColorEXT](vkRegisterCustomBorderColorEXT.html)

* 
[vkUnregisterCustomBorderColorEXT](vkUnregisterCustomBorderColorEXT.html)

* 
[VkBindHeapInfoEXT](VkBindHeapInfoEXT.html)

* 
[VkDescriptorMappingSourceConstantOffsetEXT](VkDescriptorMappingSourceConstantOffsetEXT.html)

* 
[VkDescriptorMappingSourceHeapDataEXT](VkDescriptorMappingSourceHeapDataEXT.html)

* 
[VkDescriptorMappingSourceIndirectAddressEXT](VkDescriptorMappingSourceIndirectAddressEXT.html)

* 
[VkDescriptorMappingSourceIndirectIndexArrayEXT](VkDescriptorMappingSourceIndirectIndexArrayEXT.html)

* 
[VkDescriptorMappingSourceIndirectIndexEXT](VkDescriptorMappingSourceIndirectIndexEXT.html)

* 
[VkDescriptorMappingSourcePushIndexEXT](VkDescriptorMappingSourcePushIndexEXT.html)

* 
[VkDescriptorMappingSourceShaderRecordIndexEXT](VkDescriptorMappingSourceShaderRecordIndexEXT.html)

* 
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html)

* 
[VkDeviceAddressRangeEXT](VkDeviceAddressRangeKHR.html)

* 
[VkHostAddressRangeConstEXT](VkHostAddressRangeConstEXT.html)

* 
[VkHostAddressRangeEXT](VkHostAddressRangeEXT.html)

* 
[VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html)

* 
[VkPushDataInfoEXT](VkPushDataInfoEXT.html)

* 
[VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html)

* 
[VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)

* 
[VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html)

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html):

* 
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDescriptorHeapFeaturesEXT](VkPhysicalDeviceDescriptorHeapFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](VkPhysicalDeviceDescriptorHeapPropertiesEXT.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

* 
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceDescriptorHeapTensorPropertiesARM](VkPhysicalDeviceDescriptorHeapTensorPropertiesARM.html)

If [VK_EXT_custom_border_color](VK_EXT_custom_border_color.html) is supported:

* 
Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

[VkSubsampledImageFormatPropertiesEXT](VkSubsampledImageFormatPropertiesEXT.html)

If [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html):

[VkIndirectCommandsLayoutPushDataTokenNV](VkIndirectCommandsLayoutPushDataTokenNV.html)

* 
[VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html)

* 
[VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html)

* 
[VkDescriptorMappingSourceEXT](VkDescriptorMappingSourceEXT.html)

* 
[VkSpirvResourceTypeFlagBitsEXT](VkSpirvResourceTypeFlagBitsEXT.html)

* 
[VkSpirvResourceTypeFlagsEXT](VkSpirvResourceTypeFlagsEXT.html)

* 
[VkTensorViewCreateFlagsARM](VkTensorViewCreateFlagsARM.html)

* 
`VK_EXT_DESCRIPTOR_HEAP_EXTENSION_NAME`

* 
`VK_EXT_DESCRIPTOR_HEAP_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_DESCRIPTOR_HEAP_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_DESCRIPTOR_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DATA_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SHADER_DESCRIPTOR_SET_AND_BINDING_MAPPING_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TEXEL_BUFFER_DESCRIPTOR_INFO_EXT](VkStructureType.html)

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
Extending [VkSpirvResourceTypeFlagBitsEXT](VkSpirvResourceTypeFlagBitsEXT.html):

[VK_SPIRV_RESOURCE_TYPE_TENSOR_BIT_ARM](VkSpirvResourceTypeFlagBitsEXT.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_TENSOR_PROPERTIES_ARM](VkStructureType.html)

Extending [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html):

* 
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html)

If [VK_EXT_custom_border_color](VK_EXT_custom_border_color.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_INDEX_CREATE_INFO_EXT](VkStructureType.html)

If [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeEXT](VkIndirectCommandsTokenTypeEXT.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](VkIndirectCommandsTokenTypeEXT.html)

* 
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_SEQUENCE_INDEX_EXT](VkIndirectCommandsTokenTypeEXT.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SUBSAMPLED_IMAGE_FORMAT_PROPERTIES_EXT](VkStructureType.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) is supported:

* 
Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) or [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
Extending [VkDescriptorMappingSourceEXT](VkDescriptorMappingSourceEXT.html):

[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html)

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html)

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html)

Extending [VkSpirvResourceTypeFlagBitsEXT](VkSpirvResourceTypeFlagBitsEXT.html):

* 
[VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT](VkSpirvResourceTypeFlagBitsEXT.html)

If [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html) is supported:

* 
Extending [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html):

[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_NV](VkIndirectCommandsTokenTypeNV.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_PUSH_DATA_TOKEN_NV](VkStructureType.html)

* 
Revision 1, 2024-06-12 (Tobias Hector)

Initial revision.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_heap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
