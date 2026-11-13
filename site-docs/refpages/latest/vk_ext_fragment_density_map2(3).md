# VK_EXT_fragment_density_map2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_fragment_density_map2.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_fragment_density_map2](#VK_EXT_fragment_density_map2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Additional Limits for Subsampling](#_additional_limits_for_subsampling)
- [Additional_Limits_for_Subsampling](#_additional_limits_for_subsampling)
- [Improved Host Latency](#_improved_host_latency)
- [Improved_Host_Latency](#_improved_host_latency)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_fragment_density_map2 - device extension

**Name String**

`VK_EXT_fragment_density_map2`

**Extension Type**

Device extension

**Registered Extension Number**

333

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_fragment_density_map2] @mnetsch%0A*Here describe the issue or question you have about the VK_EXT_fragment_density_map2 extension*)

**Last Modified Date**

2020-06-16

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Jonathan Tinkham, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Jan-Harald Fredriksen, ARM

This extension adds additional features and properties to
`[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)` in order to reduce fragment density map
host latency as well as improved queries for subsampled sampler
implementation-dependent behavior.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentDensityMap2FeaturesEXT](VkPhysicalDeviceFragmentDensityMap2FeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentDensityMap2PropertiesEXT](VkPhysicalDeviceFragmentDensityMap2PropertiesEXT.html)

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_2_EXTENSION_NAME`

* 
`VK_EXT_FRAGMENT_DENSITY_MAP_2_SPEC_VERSION`

* 
Extending [VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html):

[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](VkImageViewCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_PROPERTIES_EXT](VkStructureType.html)

Some implementations may not support subsampled samplers if certain
implementation limits are not observed by the app.
[VkPhysicalDeviceFragmentDensityMap2PropertiesEXT](VkPhysicalDeviceFragmentDensityMap2PropertiesEXT.html) provides additional
limits to require apps remain within these boundaries if they wish to use
subsampling.

By default, the fragment density map is locked by the host for reading
between [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html) during recording and
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html) during draw
execution.

This can introduce large latency for certain use cases between recording the
frame and displaying the frame.
Apps may wish to modify the fragment density map just before draw execution.

[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](VkImageViewCreateFlagBits.html) is intended
to help address this for implementations that do not support the
[`fragmentDensityMapDynamic`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapDynamic)
feature by deferring the start of the locked range to
[vkEndCommandBuffer](vkEndCommandBuffer.html).

// Create view for fragment density map
VkImageViewCreateInfo createInfo =
{
   .sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO,
   // ...
   .viewType = VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT,
   .format = fdmImage, // Created with VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT
   // ...
};

// ...

// Begin fragment density map render pass with deferred view.
// By default, fdmImage must not be modified after this call
// unless view is created with the FDM dynamic or deferred flags.
vkCmdBeginRenderPass(commandBuffer, pRenderPassBegin, contents);

// ...

vkCmdEndRenderPass(VkCommandBuffer commandBuffer);

// Can keep making modifications to deferred fragment density maps
// while recording commandBuffer ...

result = vkEndCommandBuffer(commandBuffer);

// Must now freeze modifying fdmImage until after the
// VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT of
// the last executing draw that uses the fdmImage in the
// last submit of commandBuffer.

* 
Revision 1, 2020-06-16 (Matthew Netsch)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_fragment_density_map2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
