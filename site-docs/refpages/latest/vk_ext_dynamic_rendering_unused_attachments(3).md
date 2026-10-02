# VK_EXT_dynamic_rendering_unused_attachments(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_dynamic_rendering_unused_attachments.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_dynamic_rendering_unused_attachments](#VK_EXT_dynamic_rendering_unused_attachments)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_dynamic_rendering_unused_attachments - device extension

**Name String**

`VK_EXT_dynamic_rendering_unused_attachments`

**Extension Type**

Device extension

**Registered Extension Number**

500

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_dynamic_rendering_unused_attachments] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_dynamic_rendering_unused_attachments extension*)

**Extension Proposal**

[VK_EXT_dynamic_rendering_unused_attachments](../../../../features/latest/features/proposals/VK_EXT_dynamic_rendering_unused_attachments.html)

**Last Modified Date**

2023-05-22

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Story, Nintendo

* 
Hans-Kristian Arntzen, Valve

* 
Jan-Harald Fredriksen, Arm

* 
James Fitzpatrick, Imagination Technologies

* 
Pan Gao, Huawei Technologies

* 
Ricardo Garcia, Igalia

* 
Stu Smith, AMD

This extension lifts some restrictions in the
`[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)` extension to allow render pass instances
and bound pipelines within those render pass instances to have an unused
attachment specified in one but not the other.
It also allows pipelines to use different formats in a render pass as long
the attachment is NULL.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT](VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT.html)

* 
`VK_EXT_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_EXTENSION_NAME`

* 
`VK_EXT_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_FEATURES_EXT](VkStructureType.html)

None.

* 
Revision 1, 2023-05-22 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_dynamic_rendering_unused_attachments).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
