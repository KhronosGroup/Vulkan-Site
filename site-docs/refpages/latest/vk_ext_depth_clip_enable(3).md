# VK_EXT_depth_clip_enable(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_clip_enable.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_clip_enable](#VK_EXT_depth_clip_enable)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_depth_clip_enable - device extension

**Name String**

`VK_EXT_depth_clip_enable`

**Extension Type**

Device extension

**Registered Extension Number**

103

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_clip_enable] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_depth_clip_enable extension*)

**Last Modified Date**

2018-12-20

**Contributors**

* 
Daniel Rakos, AMD

* 
Henri Verbeet, CodeWeavers

* 
Jeff Bolz, NVIDIA

* 
Philip Rebohle, DXVK

* 
Tobias Hector, AMD

This extension allows the depth clipping operation, that is normally
implicitly controlled by
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`depthClampEnable`, to
instead be controlled explicitly by
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html)::`depthClipEnable`.

This is useful for translating DX content which assumes depth clamping is
always enabled, but depth clip can be controlled by the DepthClipEnable
rasterization state (D3D12_RASTERIZER_DESC).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDepthClipEnableFeaturesEXT](VkPhysicalDeviceDepthClipEnableFeaturesEXT.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html)

* 
[VkPipelineRasterizationDepthClipStateCreateFlagsEXT](VkPipelineRasterizationDepthClipStateCreateFlagsEXT.html)

* 
`VK_EXT_DEPTH_CLIP_ENABLE_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_CLIP_ENABLE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_ENABLE_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_DEPTH_CLIP_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2018-12-20 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_clip_enable).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
