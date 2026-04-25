# VK_KHR_maintenance7(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance7.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance7](#VK_KHR_maintenance7)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance7 - device extension

**Name String**

`VK_KHR_maintenance7`

**Extension Type**

Device extension

**Registered Extension Number**

563

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance7] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance7 extension*)

**Extension Proposal**

[VK_KHR_maintenance7](../../../../features/latest/features/proposals/VK_KHR_maintenance7.html)

**Last Modified Date**

2024-01-30

**Interactions and External Dependencies**
**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Hans-Kristian Arntzen, Valve

* 
Pan Gao, Huawei

* 
Tobias Hector, AMD

* 
Jon Leech, Khronos

* 
Daniel Story, Nintendo

* 
Shahbaz Youssefi, Google

* 
Yiwei Zhang, Google

* 
Matthew Netsch, Qualcomm

[VK_KHR_maintenance7](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The proposed new features are as follows:

* 
Add a property query to determine if a framebuffer writes to depth or
stencil aspect does not trigger a write access in the sibling aspect.
For example, this allows sampling stencil aspect as a texture while
rendering to the sibling depth attachment and vice-versa given
appropriate image layouts.

* 
Add a way to query information regarding the underlying devices in
environments where the Vulkan implementation is provided through layered
implementations.
For example, running on Mesa/Venus, driver ID is returned as
[VK_DRIVER_ID_MESA_VENUS](VkDriverId.html), but it can be necessary to know what the
real driver under the hood is.
The new [VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html) structure can be
used to gather information regarding layers underneath the top-level
physical device.

* 
Promote [VK_RENDERING_CONTENTS_INLINE_BIT_EXT](VkRenderingFlagBits.html) and
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_EXT](VkSubpassContents.html) to
KHR

* 
Add a limit to report the maximum total count of dynamic uniform buffers
and dynamic storage buffers that can be included in a pipeline layout.

* 
Require that for an unsigned integer query, the 32-bit result value
**must** be equal to the 32 least significant bits of the equivalent 64-bit
result value.

* 
Add query for robust access support when using fragment shading rate
attachments

* 
[VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance7FeaturesKHR](VkPhysicalDeviceMaintenance7FeaturesKHR.html)

Extending [VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html):

* 
[VkPhysicalDeviceLayeredApiVulkanPropertiesKHR](VkPhysicalDeviceLayeredApiVulkanPropertiesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceLayeredApiPropertiesListKHR](VkPhysicalDeviceLayeredApiPropertiesListKHR.html)

* 
[VkPhysicalDeviceMaintenance7PropertiesKHR](VkPhysicalDeviceMaintenance7PropertiesKHR.html)

* 
[VkPhysicalDeviceLayeredApiKHR](VkPhysicalDeviceLayeredApiKHR.html)

* 
`VK_KHR_MAINTENANCE_7_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_7_SPEC_VERSION`

* 
Extending [VkRenderingFlagBits](VkRenderingFlagBits.html):

[VK_RENDERING_CONTENTS_INLINE_BIT_KHR](VkRenderingFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_LIST_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_VULKAN_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_PROPERTIES_KHR](VkStructureType.html)

Extending [VkSubpassContents](VkSubpassContents.html):

* 
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](VkSubpassContents.html)

None.

* 
Revision 1, 2024-01-30 (Jon Leech)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance7).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
