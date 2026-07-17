# VK_NV_displacement_micromap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_displacement_micromap.html

## Table of Contents

- [Name](#_name)
- [VK_NV_displacement_micromap](#VK_NV_displacement_micromap)
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

VK_NV_displacement_micromap - device extension

**Name String**

`VK_NV_displacement_micromap`

**Extension Type**

Device extension

**Registered Extension Number**

398

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)

* 
**This is a *provisional* extension and must** be used with caution.
See the [description](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header) of provisional header files for enablement and stability details.

**Deprecation State**

* 
*Deprecated* by
[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html)
extension

**Contact**

* 
Christoph Kubisch [pixeljetstream](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_displacement_micromap] @pixeljetstream%0A*Here describe the issue or question you have about the VK_NV_displacement_micromap extension*)

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_displacement_micromap] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NV_displacement_micromap extension*)

**Last Modified Date**

2023-03-17

**Interactions and External Dependencies**

TBD

**Contributors**

* 
Christoph Kubisch, NVIDIA

* 
Eric Werness, NVIDIA

Ray tracing can very efficiently render from geometry which has very fine
detail, but when using only a basic triangle representation, memory
consumption can be an issue.
This extension adds the ability to add a *displacement map* to add more
detail to triangles in an acceleration structure with an efficient in-memory
format.
The format is externally visible to allow the application to compress its
internal geometry representations into the compressed format ahead of time.
This format adds displacements along a defined vector to subtriangle
vertices which are subdivided from the main triangles.

This extension provides:

* 
a new [VkMicromapTypeEXT](VkMicromapTypeEXT.html) format for the displacement micromap,

* 
a structure to extend
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) to attach a
displacement micromap to the geometry of the acceleration structure,

* 
enums extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html) to allow
for updates.

* 
Extending [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html):

[VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDisplacementMicromapFeaturesNV](VkPhysicalDeviceDisplacementMicromapFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDisplacementMicromapPropertiesNV](VkPhysicalDeviceDisplacementMicromapPropertiesNV.html)

* 
[VkDisplacementMicromapFormatNV](VkDisplacementMicromapFormatNV.html)

* 
`VK_NV_DISPLACEMENT_MICROMAP_EXTENSION_NAME`

* 
`VK_NV_DISPLACEMENT_MICROMAP_SPEC_VERSION`

* 
Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkMicromapTypeEXT](VkMicromapTypeEXT.html):

* 
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_DISPLACEMENT_MICROMAP_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_PROPERTIES_NV](VkStructureType.html)

(1) What is the status of this extension?

* 
Deprecated.
The VK_NV_cluster_acceleration_structure extension is not a one-to-one
replacement for this extension but enables similar performance
improvements for high-tessellation geometry and is considered the
preferred direction to improve high-tessellation geometry performance.

* 
Revision 1, 2023-03-17 (Eric Werness)

Initial public revision

Revision 2, 2023-07-07 (Eric Werness)

* 
Add shader support for decode intrinsics

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_displacement_micromap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
