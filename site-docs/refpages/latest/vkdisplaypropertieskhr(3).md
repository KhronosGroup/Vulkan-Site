# VkDisplayPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPropertiesKHR - Structure describing an available display device

The `VkDisplayPropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayPropertiesKHR {
    VkDisplayKHR                  display;
    const char*                   displayName;
    VkExtent2D                    physicalDimensions;
    VkExtent2D                    physicalResolution;
    VkSurfaceTransformFlagsKHR    supportedTransforms;
    VkBool32                      planeReorderPossible;
    VkBool32                      persistentContent;
} VkDisplayPropertiesKHR;

* 
`display` is a handle that is used to refer to the display described
here.
This handle will be valid for the lifetime of the Vulkan instance.

* 
`displayName` is `NULL` or a pointer to a null-terminated UTF-8
string containing the name of the display.
Generally, this will be the name provided by the display’s EDID.
If `NULL`, no suitable name is available.
If not `NULL`, the string pointed to **must** remain accessible and
unmodified as long as `display` is valid.

* 
`physicalDimensions` describes the physical width and height of the
visible portion of the display, in millimeters.

* 
`physicalResolution` describes the physical, native, or preferred
resolution of the display.

|  | For devices which have no natural value to return here, implementations
| --- | --- |
**should** return the maximum resolution supported. |

* 
`supportedTransforms` is a bitmask of
[VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) describing which transforms are
supported by this display.

* 
`planeReorderPossible` tells whether the planes on this display **can**
have their z order changed.
If this is [VK_TRUE](VK_TRUE.html), the application **can** re-arrange the planes on
this display in any order relative to each other.

* 
`persistentContent` tells whether the display supports
self-refresh/internal buffering.
If this is true, the application **can** submit persistent present
operations on swapchains created against this display.

|  | Persistent presents **may** have higher latency, and **may** use less power when
| --- | --- |
the screen content is updated infrequently, or when only a portion of the
screen needs to be updated in most frames. |

[VK_KHR_display](VK_KHR_display.html), `VkBool32`, [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayProperties2KHR](VkDisplayProperties2KHR.html), [VkExtent2D](VkExtent2D.html), [VkSurfaceTransformFlagsKHR](VkSurfaceTransformFlagsKHR.html), [vkGetPhysicalDeviceDisplayPropertiesKHR](vkGetPhysicalDeviceDisplayPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
