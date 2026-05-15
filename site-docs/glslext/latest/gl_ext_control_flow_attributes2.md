# GL_EXT_control_flow_attributes2

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/ext/GL_EXT_control_flow_attributes2.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name

    EXT_control_flow_attributes2

Name Strings

    GL_EXT_control_flow_attributes2

Contact

    Wooyoung Kim (quic_wooykim 'at' quicinc.com), Qualcomm

Contributors

    Ruihao Zhang, Qualcomm
    Wooyoung Kim, Qualcomm

Notice

    Copyright (c) 2023 Qualcomm, Inc.

Status

    Final

Version

    Last Modified Date: 13-Dec-2023
    Revision: 1

Number

    TBD

Dependencies

    Written against SPIR-V 1.4.
    Written against GLSL 4.60.7.

    This extension can be applied to OpenGL GLSL versions 1.40
    (#version 140) and higher.

    This extension can be applied to OpenGL ES ESSL versions 3.10
    (#version 310) and higher.

    This extension is dependent on an earlier extension GL_EXT_control_flow_attributes.

Overview

    SPIR-V allows a loop to get associated with loop unroll attributes Unroll and DontUnroll.

    SPIR-V 1.4 adds additional loop unroll attributes, MinIterations, MaxIterations,
    IterationMultiple, PeelCount, and PartialCount to give a consumer
    hints on how to unroll a loop.

    The GLSL extension "GL_EXT_control_flow_attributes" adds attributes to declare
    how loops should be lowered by a consumer (e.g., unroll and dont_unroll).
    It lacks ways to give a consumer hints to fine-control the unroll behavior.

    The extension adds the attributes missing in the GLSL extension. They are:

      min_iterations
      max_iterations
      iteration_multiple
      peel_count
      partial_count

    The attributes are expected to be declared with the "unroll" attributes. For example,

        for (int i = 0; i   for (int i = 0; i   for (int i = 0; i 

    Where  is as specified in section 3.3.

    This new definition is added to the OpenGL Shading Language:

      #define GL_EXT_control_flow_attributes2 1

Add the following control-flow attributes to the table in Section 6.5 Control-Flow Attributes

       Attribute              | Relevant on | Intent
      -------------------------------------+------------------------------------
      *min_iterations(I)*     |    Loop     | the loop executes at least a given number of iterations
      *max_iterations(I)*     |    Loop     | the loop executes at most a given number of iterations
      *iteration_multiple(M)* |    Loop     | the loop executes a multiple of a given number of iterations
      *peel_count(C)*         |    Loop     | the loop should be peeled by a given number of loop iterations
      *partial_count(C)*      |    Loop     | the loop should be partially unrolled by a given number of loop iterations

Add the following before "The *unroll*, *dont_unroll*, *flatten*, and *dont_flatten* attributes are"

    /I/ in *min_iterations(I)*/*max_iterations(I)*, /M/ in *iteration_multiple(M)*,
    and /C/ in *peel_count(C)*/*partial_count(C)* must be a 32-bit signed
    or unsigned non-specialization compile-time constant integral expression greater than 0, or a
    compile-time error results.

Revision History

    Rev.    Date         Author          Changes
    ----  -----------    ------------    ----------------------------------------------
    1     13-Dec-2023    Wooyoung Kim    final version
