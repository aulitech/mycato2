export const initialData = {
  global_info: {
    name: '',
    HW_UID: '',
    sleep: {
      timeout: 600,
      threshold: 5,
    },
    orientation: {
      front: '-y',
      bottom: '-x',
      left: '-z',
    },
    calibration: {
      drift: [0, 0, 0],
      auto_threshold: 3,
      auto_samples: 100,
    },
    battery: {
      low: 22800,
      high: 27500,
    },
  },
  connections: [
    {
      connection_name: 'Default Connection',
      screen_size: {
        height: 1080,
        width: 1920,
      },
      operation_mode: 'pointer',
      gesture: {
        key: [
          'None',
          'Nod Up',
          'Nod Down',
          'Nod Right',
          'Nod Left',
          'Tilt Right',
          'Tilt Left',
        ],
        confidence_threshold: 0.62,
        length: 200,
        idle_cutoff: 20,
        start_threshold: 22.359999999999999,
        idle_threshold: 30,
        timeout: 1,
        gc_timeout: 10,
        turbo_rate: {
          initial: 1,
          minimum: 0.20000000000000001,
          decay_rate: 0.90000000000000002,
        },
      },
      mouse: {
        idle_threshold: 5,
        min_run_cycles: 0,
        idle_duration: 80,
        dwell_duration: 50,
        dwell_repeat: true,
        scale_x: 0.5,
        scale_y: 0.40000000000000002,
        dynamic_mouse: {
          input: {
            slow: 20,
            fast: 40,
          },
          output: {
            slow: 0.5,
            fast: 1.5,
          },
        },
        shake_size: 6,
        num_shake: 3,
        mouse_type: 'ACCEL',
      },
      clicker: {
        max_click_spacing: 0.45000000000000001,
        tap_ths: 11,
        quiet: 2,
        shock: 2,
      },
      bindings: [
        {
          command: 'noop',
          args: [],
        },
        {
          command: 'button_action',
          args: [0, 'double_tap', 1],
        },
        {
          command: 'button_action',
          args: [0, 'tap', 1],
        },
        {
          command: 'button_action',
          args: [0, 'tap', 2],
        },
        {
          command: 'button_action',
          args: [0, 'hold_until_idle', 1],
        },
        {
          command: 'quick_sleep',
          args: [],
        },
      ],
    },
  ],
};
