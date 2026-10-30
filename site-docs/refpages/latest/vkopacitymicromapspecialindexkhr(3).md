# VkOpacityMicromapSpecialIndexKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpacityMicromapSpecialIndexKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpacityMicromapSpecialIndexKHR - Enum for special indices in the opacity micromap

The [VkOpacityMicromapSpecialIndexKHR](#) enumeration is defined as:

// Provided by VK_KHR_opacity_micromap
typedef enum VkOpacityMicromapSpecialIndexKHR {
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR = -1,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR = -2,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR = -3,
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR = -4,
  // Provided by VK_EXT_opacity_micromap with VK_NV_cluster_acceleration_structure
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV = -5,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR,
  // Provided by VK_EXT_opacity_micromap
    VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_EXT = VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR,
} VkOpacityMicromapSpecialIndexKHR;

// Provided by VK_EXT_opacity_micromap
// Equivalent to VkOpacityMicromapSpecialIndexKHR
typedef VkOpacityMicromapSpecialIndexKHR VkOpacityMicromapSpecialIndexEXT;

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_TRANSPARENT_KHR](#) specifies
that the entire triangle is fully transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_OPAQUE_KHR](#) specifies that
the entire triangle is fully opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_TRANSPARENT_KHR](#)
specifies that the entire triangle is unknown-transparent.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_FULLY_UNKNOWN_OPAQUE_KHR](#)
specifies that the entire triangle is unknown-opaque.

* 
[VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV](#)
specifies that [Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap) will be
disabled for this triangle and opacity value will be picked from
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`baseGeometryIndexAndGeometryFlags`
instead.
Note that this special index is only valid for [    Cluster Geometry](../../../../spec/latest/chapters/accelstructures.html#cluster-geometry).

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VK_KHR_opacity_micromap](VK_KHR_opacity_micromap.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkOpacityMicromapSpecialIndexKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
