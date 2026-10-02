# VK_EXT_debug_marker(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_debug_marker.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_debug_marker](#VK_EXT_debug_marker)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_debug_marker - device extension

**Name String**

`VK_EXT_debug_marker`

**Extension Type**

Device extension

**Registered Extension Number**

23

**Revision**

4

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_debug_report](VK_EXT_debug_report.html)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_debug_utils](VK_EXT_debug_utils.html)
extension

**Special Use**

* 
[Debugging tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Baldur Karlsson [baldurk](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_debug_marker] @baldurk%0A*Here describe the issue or question you have about the VK_EXT_debug_marker extension*)

**Last Modified Date**

2017-01-31

**IP Status**

No known IP claims.

**Contributors**

* 
Baldur Karlsson

* 
Dan Ginsburg, Valve

* 
Jon Ashburn, LunarG

* 
Kyle Spagnoli, NVIDIA

The `VK_EXT_debug_marker` extension is a device extension.
It introduces concepts of object naming and tagging, for better tracking of
Vulkan objects, as well as additional commands for recording annotations of
named sections of a workload to aid organization and offline analysis in
external tools.

* 
[vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html)

* 
[vkCmdDebugMarkerEndEXT](vkCmdDebugMarkerEndEXT.html)

* 
[vkCmdDebugMarkerInsertEXT](vkCmdDebugMarkerInsertEXT.html)

* 
[vkDebugMarkerSetObjectNameEXT](vkDebugMarkerSetObjectNameEXT.html)

* 
[vkDebugMarkerSetObjectTagEXT](vkDebugMarkerSetObjectTagEXT.html)

* 
[VkDebugMarkerMarkerInfoEXT](VkDebugMarkerMarkerInfoEXT.html)

* 
[VkDebugMarkerObjectNameInfoEXT](VkDebugMarkerObjectNameInfoEXT.html)

* 
[VkDebugMarkerObjectTagInfoEXT](VkDebugMarkerObjectTagInfoEXT.html)

* 
[VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html)

* 
`VK_EXT_DEBUG_MARKER_EXTENSION_NAME`

* 
`VK_EXT_DEBUG_MARKER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_NAME_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_TAG_INFO_EXT](VkStructureType.html)

**Example 1**

Associate a name with an image, for easier debugging in external tools or
with validation layers that can print a friendly name when referring to
objects in error messages.

    extern VkDevice device;
    extern VkImage image;

    // Must call extension functions through a function pointer:
    PFN_vkDebugMarkerSetObjectNameEXT pfnDebugMarkerSetObjectNameEXT = (PFN_vkDebugMarkerSetObjectNameEXT)vkGetDeviceProcAddr(device, "vkDebugMarkerSetObjectNameEXT");

    // Set a name on the image
    const VkDebugMarkerObjectNameInfoEXT imageNameInfo =
    {
        .sType = VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_NAME_INFO_EXT,
        .pNext = NULL,
        .objectType = VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_EXT,
        .object = (uint64_t)image,
        .pObjectName = "Brick Diffuse Texture",
    };

    pfnDebugMarkerSetObjectNameEXT(device, &imageNameInfo);

    // A subsequent error might print:
    //   Image 'Brick Diffuse Texture' (0xc0dec0dedeadbeef) is used in a
    //   command buffer with no memory bound to it.

**Example 2**

Annotating regions of a workload with naming information so that offline
analysis tools can display a more usable visualization of the commands
submitted.

    extern VkDevice device;
    extern VkCommandBuffer commandBuffer;

    // Must call extension functions through a function pointer:
    PFN_vkCmdDebugMarkerBeginEXT pfnCmdDebugMarkerBeginEXT = (PFN_vkCmdDebugMarkerBeginEXT)vkGetDeviceProcAddr(device, "vkCmdDebugMarkerBeginEXT");
    PFN_vkCmdDebugMarkerEndEXT pfnCmdDebugMarkerEndEXT = (PFN_vkCmdDebugMarkerEndEXT)vkGetDeviceProcAddr(device, "vkCmdDebugMarkerEndEXT");
    PFN_vkCmdDebugMarkerInsertEXT pfnCmdDebugMarkerInsertEXT = (PFN_vkCmdDebugMarkerInsertEXT)vkGetDeviceProcAddr(device, "vkCmdDebugMarkerInsertEXT");

    // Describe the area being rendered
    const VkDebugMarkerMarkerInfoEXT houseMarker =
    {
        .sType = VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT,
        .pNext = NULL,
        .pMarkerName = "Brick House",
        .color = { 1.0f, 0.0f, 0.0f, 1.0f },
    };

    // Start an annotated group of calls under the 'Brick House' name
    pfnCmdDebugMarkerBeginEXT(commandBuffer, &houseMarker);
    {
        // A mutable structure for each part being rendered
        VkDebugMarkerMarkerInfoEXT housePartMarker =
        {
            .sType = VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT,
            .pNext = NULL,
            .pMarkerName = NULL,
            .color = { 0.0f, 0.0f, 0.0f, 0.0f },
        };

        // Set the name and insert the marker
        housePartMarker.pMarkerName = "Walls";
        pfnCmdDebugMarkerInsertEXT(commandBuffer, &housePartMarker);

        // Insert the drawcall for the walls
        vkCmdDrawIndexed(commandBuffer, 1000, 1, 0, 0, 0);

        // Insert a recursive region for two sets of windows
        housePartMarker.pMarkerName = "Windows";
        pfnCmdDebugMarkerBeginEXT(commandBuffer, &housePartMarker);
        {
            vkCmdDrawIndexed(commandBuffer, 75, 6, 1000, 0, 0);
            vkCmdDrawIndexed(commandBuffer, 100, 2, 1450, 0, 0);
        }
        pfnCmdDebugMarkerEndEXT(commandBuffer);

        housePartMarker.pMarkerName = "Front Door";
        pfnCmdDebugMarkerInsertEXT(commandBuffer, &housePartMarker);

        vkCmdDrawIndexed(commandBuffer, 350, 1, 1650, 0, 0);

        housePartMarker.pMarkerName = "Roof";
        pfnCmdDebugMarkerInsertEXT(commandBuffer, &housePartMarker);

        vkCmdDrawIndexed(commandBuffer, 500, 1, 2000, 0, 0);
    }
    // End the house annotation started above
    pfnCmdDebugMarkerEndEXT(commandBuffer);

1) Should the tag or name for an object be specified using the `pNext`
parameter in the object’s `Vk*CreateInfo` structure?

**RESOLVED**: No.
While this fits with other Vulkan patterns and would allow more type safety
and future proofing against future objects, it has notable downsides.
In particular passing the name at `Vk*CreateInfo` time does not allow
renaming, prevents late binding of naming information, and does not allow
naming of implicitly created objects such as queues and swapchain images.

2) Should the command annotation functions [vkCmdDebugMarkerBeginEXT](vkCmdDebugMarkerBeginEXT.html)
and [vkCmdDebugMarkerEndEXT](vkCmdDebugMarkerEndEXT.html) support the ability to specify a color?

**RESOLVED**: Yes.
The functions have been expanded to take an optional color which can be used
at will by implementations consuming the command buffer annotations in their
visualization.

3) Should the functions added in this extension accept an extensible
structure as their parameter for a more flexible API, as opposed to direct
function parameters? If so, which functions?

**RESOLVED**: Yes.
All functions have been modified to take a structure type with extensible
`pNext` pointer, to allow future extensions to add additional annotation
information in the same commands.

* 
Revision 1, 2016-02-24 (Baldur Karlsson)

Initial draft, based on LunarG marker spec

Revision 2, 2016-02-26 (Baldur Karlsson)

* 
Renamed Dbg to DebugMarker in function names

* 
Allow markers in secondary command buffers under certain circumstances

* 
Minor language tweaks and edits

Revision 3, 2016-04-23 (Baldur Karlsson)

* 
Reorganize spec layout to closer match desired organization

* 
Added optional color to markers (both regions and inserted labels)

* 
Changed functions to take extensible structs instead of direct function
parameters

Revision 4, 2017-01-31 (Baldur Karlsson)

* 
Added explicit dependency on VK_EXT_debug_report

* 
Moved definition of [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html) to debug report
chapter.

* 
Fixed typo in dates in revision history

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_debug_marker).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
