# VK_VALVE_fragment_density_map_layered(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_fragment_density_map_layered.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_fragment_density_map_layered](#VK_VALVE_fragment_density_map_layered)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VALVE_fragment_density_map_layered - device extension

**Name String**

`VK_VALVE_fragment_density_map_layered`

**Extension Type**

Device extension

**Registered Extension Number**

612

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_maintenance5](VK_KHR_maintenance5.html)

     or

     [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4)

and

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)

**Contact**

* 
Connor Abbott [cwabbott0](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_fragment_density_map_layered] @cwabbott0%0A*Here describe the issue or question you have about the VK_VALVE_fragment_density_map_layered extension*)

**Last Modified Date**

2025-06-06

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1.

* 
Interacts with Vulkan 1.3.

* 
Interacts with Vulkan 1.4.

* 
Interacts with `[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)`.

**IP Status**

No known IP claims.

**Contributors**

* 
Connor Abbott, VALVE

* 
Mike Blumenkrantz, VALVE

This extension enables the use of layered fragment density maps.

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](VkPipelineFragmentDensityMapLayeredCreateInfoVALVE.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE](VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE](VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE.html)

* 
`VK_VALVE_FRAGMENT_DENSITY_MAP_LAYERED_EXTENSION_NAME`

* 
`VK_VALVE_FRAGMENT_DENSITY_MAP_LAYERED_SPEC_VERSION`

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkPipelineCreateFlagBits2.html)

Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

* 
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderingFlagBits.html)

Extending [VkRenderPassCreateFlagBits](VkRenderPassCreateFlagBits.html):

* 
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderPassCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_FEATURES_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_PROPERTIES_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_DENSITY_MAP_LAYERED_CREATE_INFO_VALVE](VkStructureType.html)

* 
Revision 1, 2025-06-06 (Mike Blumenkrantz)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_fragment_density_map_layered).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
