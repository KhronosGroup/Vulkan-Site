# LaunchSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/LaunchSizeKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

LaunchSizeKHR - Launch dimensions for ray shaders

`LaunchSizeKHR`

A variable decorated with the `LaunchSizeKHR` decoration will contain the
`width`, `height`, and `depth` dimensions passed to the
[vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html)
or
[vkCmdTraceRaysNV](vkCmdTraceRaysNV.html)
command that initiated this shader execution.
The `width` is in the first component, the `height` is in the second
component, and the `depth` is in the third component.

Valid Usage

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04269) VUID-LaunchSizeKHR-LaunchSizeKHR-04269

The `LaunchSizeKHR` decoration **must** be used only within the
`RayGenerationKHR`, `IntersectionKHR`, `AnyHitKHR`,
`ClosestHitKHR`, `MissKHR`, or `CallableKHR` `Execution` `Model`

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04270) VUID-LaunchSizeKHR-LaunchSizeKHR-04270

The variable decorated with `LaunchSizeKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-LaunchSizeKHR-LaunchSizeKHR-04271) VUID-LaunchSizeKHR-LaunchSizeKHR-04271

The variable decorated with `LaunchSizeKHR` **must** be declared as a
three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
