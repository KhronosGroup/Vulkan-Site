# VK_AMDX_dense_geometry_format(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMDX_dense_geometry_format.html

## Table of Contents

- [Name](#_name)
- [VK_AMDX_dense_geometry_format](#VK_AMDX_dense_geometry_format)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMDX_dense_geometry_format - device extension

**Name String**

`VK_AMDX_dense_geometry_format`

**Extension Type**

Device extension

**Registered Extension Number**

479

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

and

     [VK_KHR_maintenance5](VK_KHR_maintenance5.html)

     or

     [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4)

* 
**This is a *provisional* extension and must** be used with caution.
See the [description](../../../../spec/latest/appendices/boilerplate.html#boilerplate-provisional-header) of provisional header files for enablement and stability details.

**Contact**

* 
Stu Smith [stu-s](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMDX_dense_geometry_format] @stu-s%0A*Here describe the issue or question you have about the VK_AMDX_dense_geometry_format extension*)

**Extension Proposal**

[VK_AMDX_dense_geometry_format](../../../../features/latest/features/proposals/VK_AMDX_dense_geometry_format.html)

**Last Modified Date**

2025-07-10

**IP Status**

No known IP claims.

**Contributors**

* 
Stu Smith, AMD

* 
Josh Barczak, AMD

* 
Carsten Benthin, AMD

* 
David McAllister, AMD

This extension adds the ability to build ray tracing acceleration structures
from pre-compressed `Dense Geometry Format` geometry data.

* 
Extending [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html):

[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX](VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX.html)

* 
[VkCompressedTriangleFormatAMDX](VkCompressedTriangleFormatAMDX.html)

* 
`VK_AMDX_DENSE_GEOMETRY_FORMAT_EXTENSION_NAME`

* 
`VK_AMDX_DENSE_GEOMETRY_FORMAT_SPEC_VERSION`

* 
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX](VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_ALIGNMENT_AMDX.html)

* 
[VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX](VK_COMPRESSED_TRIANGLE_FORMAT_DGF1_BYTE_STRIDE_AMDX.html)

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX](VkBufferUsageFlagBits2.html)

Extending [VkGeometryTypeKHR](VkGeometryTypeKHR.html):

* 
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DENSE_GEOMETRY_FORMAT_TRIANGLES_DATA_AMDX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DENSE_GEOMETRY_FORMAT_FEATURES_AMDX](VkStructureType.html)

None.

None.

* 
Revision 1, 2025-07-10 (Stu Smith)

Initial revision.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMDX_dense_geometry_format).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
