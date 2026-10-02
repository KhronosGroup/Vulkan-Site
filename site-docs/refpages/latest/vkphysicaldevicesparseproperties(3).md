# VkPhysicalDeviceSparseProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSparseProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSparseProperties - Structure specifying physical device sparse memory properties

The `VkPhysicalDeviceSparseProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceSparseProperties {
    VkBool32    residencyStandard2DBlockShape;
    VkBool32    residencyStandard2DMultisampleBlockShape;
    VkBool32    residencyStandard3DBlockShape;
    VkBool32    residencyAlignedMipSize;
    VkBool32    residencyNonResidentStrict;
} VkPhysicalDeviceSparseProperties;

* 
`residencyStandard2DBlockShape`
is [VK_TRUE](VK_TRUE.html) if the physical device will access all single-sample 2D
sparse resources using the standard sparse image block shapes (based on
image format), as described in the
[Standard Sparse Image Block    Shapes (Single Sample)](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseblockshapessingle) table.
If this property is not supported the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for single-sample 2D images is not **required** to match the
standard sparse image block dimensions listed in the table.

* 
`residencyStandard2DMultisampleBlockShape`
is [VK_TRUE](VK_TRUE.html) if the physical device will access all multisample 2D
sparse resources using the standard sparse image block shapes (based on
image format), as described in the
[Standard Sparse Image Block Shapes    (MSAA)](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseblockshapesmsaa) table.
If this property is not supported, the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for multisample 2D images is not **required** to match the
standard sparse image block dimensions listed in the table.

* 
`residencyStandard3DBlockShape`
is [VK_TRUE](VK_TRUE.html) if the physical device will access all 3D sparse
resources using the standard sparse image block shapes (based on image
format), as described in the
[Standard Sparse Image Block    Shapes (Single Sample)](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseblockshapessingle) table.
If this property is not supported, the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for 3D images is not **required** to match the standard sparse
image block dimensions listed in the table.

* 
`residencyAlignedMipSize`
is [VK_TRUE](VK_TRUE.html) if images with mip level dimensions that are not
integer multiples of the corresponding dimensions of the sparse image
block **may** be placed in the mip tail.
If this property is not reported, only mip levels with dimensions
smaller than the `imageGranularity` member of the
`VkSparseImageFormatProperties` structure will be placed in the mip
tail.
If this property is reported the implementation is allowed to return
[VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](VkSparseImageFormatFlagBits.html) in the `flags`
member of `VkSparseImageFormatProperties`, indicating that mip level
dimensions that are not integer multiples of the corresponding
dimensions of the sparse image block will be placed in the mip tail.

* 
`residencyNonResidentStrict`
specifies whether the physical device **can** consistently access
non-resident regions of a resource.
If this property is [VK_TRUE](VK_TRUE.html), access to non-resident regions of
resources will be guaranteed to return values as if the resource was
populated with 0; writes to non-resident regions will be discarded.

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkPhysicalDeviceSparseProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
