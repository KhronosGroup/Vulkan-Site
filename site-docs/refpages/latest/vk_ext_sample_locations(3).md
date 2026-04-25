# VK_EXT_sample_locations(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_sample_locations.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_sample_locations](#VK_EXT_sample_locations)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_sample_locations - device extension

**Name String**

`VK_EXT_sample_locations`

**Extension Type**

Device extension

**Registered Extension Number**

144

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_sample_locations] @drakos-amd%0A*Here describe the issue or question you have about the VK_EXT_sample_locations extension*)

**Last Modified Date**

2017-08-02

**Contributors**

* 
Mais Alnasser, AMD

* 
Matthaeus G. Chajdas, AMD

* 
Maciej Jesionowski, AMD

* 
Daniel Rakos, AMD

* 
Slawomir Grajewski, Intel

* 
Jeff Bolz, NVIDIA

* 
Bill Licea-Kane, Qualcomm

This extension allows an application to modify the locations of samples
within a pixel used in rasterization.
Additionally, it allows applications to specify different sample locations
for each pixel in a group of adjacent pixels, which **can** increase
antialiasing quality (particularly if a custom resolve shader is used that
takes advantage of these different locations).

It is common for implementations to optimize the storage of depth values by
storing values that **can** be used to reconstruct depth at each sample
location, rather than storing separate depth values for each sample.
For example, the depth values from a single triangle **may** be represented
using plane equations.
When the depth value for a sample is needed, it is automatically evaluated
at the sample location.
Modifying the sample locations causes the reconstruction to no longer
evaluate the same depth values as when the samples were originally
generated, thus the depth aspect of a depth/stencil attachment **must** be
cleared before rendering to it using different sample locations.

Some implementations **may** need to evaluate depth image values while
performing image layout transitions.
To accommodate this, instances of the [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)
structure **can** be specified for each situation where an explicit or
automatic layout transition has to take place.
[VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html) **can** be chained from
[VkImageMemoryBarrier](VkImageMemoryBarrier.html) structures to provide sample locations for layout
transitions performed by [vkCmdWaitEvents](vkCmdWaitEvents.html) and
[vkCmdPipelineBarrier](vkCmdPipelineBarrier.html) calls, and
[VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html) **can** be chained from
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) to provide sample locations for layout
transitions performed implicitly by a render pass instance.

* 
[vkCmdSetSampleLocationsEXT](vkCmdSetSampleLocationsEXT.html)

* 
[vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html)

* 
[VkAttachmentSampleLocationsEXT](VkAttachmentSampleLocationsEXT.html)

* 
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html)

* 
[VkSampleLocationEXT](VkSampleLocationEXT.html)

* 
[VkSubpassSampleLocationsEXT](VkSubpassSampleLocationsEXT.html)

* 
Extending [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html):

[VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)

Extending [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html):

* 
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html):

* 
[VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html)

* 
`VK_EXT_SAMPLE_LOCATIONS_EXTENSION_NAME`

* 
`VK_EXT_SAMPLE_LOCATIONS_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MULTISAMPLE_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLE_LOCATIONS_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SAMPLE_LOCATIONS_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_SAMPLE_LOCATIONS_BEGIN_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLE_LOCATIONS_INFO_EXT](VkStructureType.html)

1) When using with Dynamic Rendering, is there a
VkRenderPassSampleLocationsBeginInfoEXT equivalent struct

**RESOLVED**: No, there are no subpasses that need to have a sample location
set.

* 
Revision 1, 2017-08-02 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_sample_locations).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
