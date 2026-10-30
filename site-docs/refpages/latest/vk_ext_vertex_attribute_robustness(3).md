# VK_EXT_vertex_attribute_robustness(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_vertex_attribute_robustness.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_vertex_attribute_robustness](#VK_EXT_vertex_attribute_robustness)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_maintenance9](#_promotion_to_vk_khr_maintenance9)
- [Promotion_to_VK_KHR_maintenance9](#_promotion_to_vk_khr_maintenance9)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_vertex_attribute_robustness - device extension

**Name String**

`VK_EXT_vertex_attribute_robustness`

**Extension Type**

Device extension

**Registered Extension Number**

609

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_maintenance9](VK_KHR_maintenance9.html)
extension

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_vertex_attribute_robustness] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_vertex_attribute_robustness extension*)

**Last Modified Date**

2024-11-01

**IP Status**

No known IP claims.

**Contributors**

* 
Daniel Story, Nintendo

It can be detrimental to performance for applications to have to define fake
vertex attribute locations and buffer bindings for vertex shaders that may
reference attribute locations for which there is no vertex data.

This extension allows applications to not have to specify fake vertex
attribute locations, and if the vertex shader reads those attributes it will
read (0,0,0,0) or (0,0,0,1).

The same functionality is provided by [VK_KHR_maintenance9](VK_KHR_maintenance9.html), but
enabled by the [`maintenance9`](../../../../spec/latest/chapters/features.html#features-maintenance9) feature instead.
The [VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT](VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT.html) structure was
not included in the maintenance extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT](VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT.html)

* 
`VK_EXT_VERTEX_ATTRIBUTE_ROBUSTNESS_EXTENSION_NAME`

* 
`VK_EXT_VERTEX_ATTRIBUTE_ROBUSTNESS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_ROBUSTNESS_FEATURES_EXT](VkStructureType.html)

None

* 
Revision 1, 2024-11-01 (Piers Daniell)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_vertex_attribute_robustness).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
