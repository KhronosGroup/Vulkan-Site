# VK_QCOM_fragment_density_map_offset(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_fragment_density_map_offset.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_fragment_density_map_offset](#VK_QCOM_fragment_density_map_offset)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Fragment Density Map](#_fragment_density_map)
- [Fragment_Density_Map](#_fragment_density_map)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_fragment_density_map_offset - device extension

**Name String**

`VK_QCOM_fragment_density_map_offset`

**Extension Type**

Device extension

**Registered Extension Number**

426

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html)
extension

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_fragment_density_map_offset] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_fragment_density_map_offset extension*)

**Last Modified Date**

2024-06-17

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Jonathan Wicks, Qualcomm Technologies, Inc.

* 
Jonathan Tinkham, Qualcomm Technologies, Inc.

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Manan Katwala, Qualcomm Technologies, Inc.

* 
Connor Abbott, Valve Corporation

This extension allows an application to specify offsets to a fragment
density map attachment, changing the location where the fragment density map
is applied to the framebuffer.
This is helpful for eye-tracking use cases where the fovea needs to be moved
around the framebuffer to match the eye pose.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFragmentDensityMapOffsetFeaturesQCOM](VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFragmentDensityMapOffsetPropertiesQCOM](VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT.html)

Extending [VkSubpassEndInfo](VkSubpassEndInfo.html), [VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html):

* 
[VkSubpassFragmentDensityMapOffsetEndInfoQCOM](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html)

* 
`VK_QCOM_FRAGMENT_DENSITY_MAP_OFFSET_EXTENSION_NAME`

* 
`VK_QCOM_FRAGMENT_DENSITY_MAP_OFFSET_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_QCOM](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_QCOM](VkStructureType.html)

If the fragment density map size is larger than framebuffer size /
`minFragmentDensityTexelSize`, then offsets may be applied with
[VkSubpassFragmentDensityMapOffsetEndInfoQCOM](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html) to shift the fragment
density map.

// Create fragment density map
VkImageCreateInfo imageCreateInfo =
{
    .sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,
    .pNext = nullptr,
    .flags = VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_QCOM,
    .imageType = VK_IMAGE_TYPE_2D,    // Must be 2D
    .format = VK_FORMAT_R8G8_UNORM,   // Must have VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT
    .extent = {64, 64, 1},
    .mipLevels = 1,
    .arrayLayers = 2,                 // 1 for each multiview view
    .samples = VK_SAMPLE_COUNT_1_BIT, // Must be 1x MSAA
    .tiling = tiling,
    .usage = VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT,
    // ...
};

vkCreateImage(device, &imageCreateInfo, nullptr, &fdmImage);

// Start render pass with fbo that has fdmImage as fragmentDensityMapAttachment
// All other attachments must have been created with
// VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_QCOM
// FBO has dimensions 1024x1024 in this example
vkCmdBeginRenderPass2(commandBuffer, &renderPassBeginInfo, pSubpassBeginInfo);

// ...

// Shift fragment density map image by offset to put fovea in center of vision
/*
   If minFragmentDensityTexelSize is 32x32, then offsets can be at most
   1024x1024 for this example before density value access is clamped to edge of map

   This is because the region of each fdmImage texel is

     texelSize = max(framebuffer / fdmImage, minFragmentDensityTexelSize) = 32x32

   and the fdmImage covers a total framebuffer region of

     fdmImageRegion = fdmImage * texelSize = 2048x2048

   This means that the fragment density map can be shifted up to 1024x1024
   before the density values are clamped to edge of map
*/
VkSubpassFragmentDensityMapOffsetEndInfoQCOM offsetInfo =
{
    .sType = VK_STRUCTURE_TYPE_SUBPASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_QCOM,
    .fragmentDensityOffsetCount = 2,    // 1 for each layer/multiview view
    .pFragmentDensityOffsets = offsets, // aligned to fragmentDensityOffsetGranularity
};

subpassEndInfo.pNext = &offsetInfo;

// Only offsets given to the last subpass are used for the whole render pass
// Offsets given in other subpasses are ignored
vkCmdEndRenderPass2(VkCommandBuffer commandBuffer, &subpassEndInfo);

* 
Revision 3, 2025-03-20 (Connor Abbott/Matthew Netsch)

Fix clamp equation and clarify the offsets are FDM relative (editorial
only)

Revision 2, 2024-06-17 (Matthew Netsch)

* 
Fix typo in spec regarding fragmentDensityMapOffset feature

Revision 1, 2021-09-03 (Matthew Netsch)

* 
Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_fragment_density_map_offset).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
