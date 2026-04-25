# VkOpacityMicromapSpecialIndexEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpacityMicromapSpecialIndexEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpacityMicromapSpecialIndexEXT - Enum for special indices in the opacity micromap

The [VkOpacityMicromapSpecialIndexEXT](#) enumeration is defined as:

// Provided by VK_EXT_opacity_micromap
typedef enum VkOpacityMicromapSpecialIndexEXT {
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT = -1,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT = -2,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT = -3,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT = -4,
  // Provided by VK_EXT_opacity_micromap with VK_NV_cluster_acceleration_structure
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV = -5,
} VkOpacityMicromapSpecialIndexEXT;

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT](#) specifies
that the entire triangle is fully transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT](#) specifies that
the entire triangle is fully opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT](#)
specifies that the entire triangle is unknown-transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT](#)
specifies that the entire triangle is unknown-opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV](#)
specifies that [Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap) will be
disabled for this triangle and opacity value will be picked from
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`baseGeometryIndexAndGeometryFlags`
instead.
Note that this special index is only valid for [    Cluster Geometry](../../../../spec/latest/chapters/accelstructures.html#cluster-geometry).

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkOpacityMicromapSpecialIndexEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
